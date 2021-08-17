import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserDocument, User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private fireStore: AngularFirestore
  ) { }

  getUserDocument(uid: string) {
    const userDoc = this.fireStore.doc<UserDocument>(`users/${uid}`).get();

    if (userDoc) {
      return userDoc;
    } else {
      return null;
    }
  }

  setUserDocument(user: User) {
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
