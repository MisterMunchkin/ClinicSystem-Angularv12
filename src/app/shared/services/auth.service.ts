import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false
  };

  constructor(
    private fireAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {
    fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.userData.uid = user.uid;
        this.userData.email = user.email || '';
        this.userData.displayName = user.displayName || '';
        this.userData.emailVerified = user.emailVerified;
        this.userData.photoURL = user.photoURL || '';

        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (Object.keys(user).length > 0) ? true : false;
  }

  isAdmin(): Promise<boolean> | undefined {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');

    const userPromise = this.userService.getUserDocument(user.uid)?.get()?.toPromise();

    return userPromise?.then(user => {
      const data = user.data();
      return (data && data.isAdmin) ? true : false;
    });
  }

  // Sign out
  async signOut() {
    return await this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  onSignInSuccessful(user: User): void {
    this.userService.setUserDocument(user);
  }
}
