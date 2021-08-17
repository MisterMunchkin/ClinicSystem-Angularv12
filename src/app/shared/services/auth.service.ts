import { Injectable } from '@angular/core';
import { User, UserDocument } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
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

  async IsAdmin(): Promise<boolean> {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');

    const userSnapshot: Observable<UserDocument> = this.GetUserData(user.uid);
    console.log(userSnapshot);
    return (userSnapshot) ? true : false;
  }

  // Sign out
  SignOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  OnSignInSuccessful(user: User): void {
    this.SetUserData(user);
  }

  GetUserData(uid: string) {
    const userRef: AngularFirestoreDocument<UserDocument> = this.fireStore.doc(`users/${uid}`);

    const user = userRef.valueChanges();

    return user;
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
}
