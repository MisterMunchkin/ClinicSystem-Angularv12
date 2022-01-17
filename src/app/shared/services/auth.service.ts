import { Injectable } from '@angular/core';
import { AuthUser, UserDocument } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: AuthUser = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false
  };

  constructor(
    private fireAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {
    fireAuth.onAuthStateChanged(user => {
      if (user && user.email) {
        this.userData.uid = user.uid;
        this.userData.email = user.email || '';
        this.userData.displayName = user.displayName || '';
        this.userData.emailVerified = user.emailVerified;
        this.userData.photoURL = user.photoURL || '';

        this.cookieService.set('user', JSON.stringify(this.userData));

        //Get UserDocument object from firestore
        this.userService.getUserDocumentObservable(user.email)
        .subscribe(userDoc => {
          this.cookieService.set('clinic', JSON.stringify(userDoc?.clinic || ''));
        });

      } else {
        this.cookieService.delete('user');
        this.cookieService.delete('clinic');
      }
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(this.cookieService.get('user') || '{}');
    return (Object.keys(user).length > 0) ? true : false;
  }

  isAdmin(): Promise<boolean> | undefined {
    const user: AuthUser = JSON.parse(this.cookieService.get('user') || '{}');

    const userPromise = this.userService.getUserDocument(user.email)?.get()?.toPromise();

    return userPromise?.then(user => {
      const data = user.data();
      return (data && data.isAdmin) ? true : false;
    });
  }

  isDoctor(): Promise<boolean> | undefined {
    const user: AuthUser = JSON.parse(this.cookieService.get('user') || '{}');

    const userPromise = this.userService.getUserDocument(user.email)?.get()?.toPromise();

    return userPromise?.then(user => {
      const data = user.data();
      return (data && data.isDoctor) ? true : false;
    });
  }

  // Sign out
  async signOut() {
    return await this.fireAuth.signOut().then(() => {
      this.cookieService.delete('user');
      this.cookieService.delete('clinic');
      this.router.navigate(['sign-in']);
    })
  }

  onSignInSuccessful(user: AuthUser): Observable<UserDocument | undefined> {
    return this.userService.setLoggedInUserDocument(user);
  }
}
