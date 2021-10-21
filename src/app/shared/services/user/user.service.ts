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

  getUserCollections(): Observable<UserDocument[]> {
    const userCollections: AngularFirestoreCollection<UserDocument> = this.fireStore.collection(`users`);

    return userCollections.valueChanges();
  }

  getUserDocument(uid: string): AngularFirestoreDocument<UserDocument> | null {
    const userDoc: AngularFirestoreDocument<UserDocument> = this.fireStore.doc(`users/${uid}`);

    if (userDoc) {
      return userDoc;
    } else {
      return null;
    }
  }

  //If Observable is required for subscribing
  getUserDocumentObservable(uid: string) : Observable<UserDocument | undefined> {
    const userDoc: AngularFirestoreDocument<UserDocument> = this.fireStore.doc(`users/${uid}`);

    return userDoc.valueChanges();
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
