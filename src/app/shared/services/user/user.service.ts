import { GlobalFirestoreService } from './../global.firestore.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserDocument, AuthUser } from '../../models/user';
import { CookieService } from 'ngx-cookie-service';
import { Clinic } from '../../models/clinic';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GlobalFirestoreService {
  constructor(
    private fireStore: AngularFirestore,
    private cookieService: CookieService
  ) {
    super();
  }

  //Update or Add users into the User collection whenever they get invited
  //to join a clinic by the Clinic Admin from User page
  //Update is also part because user could have tried to log in before and
  //User was recorded into Collection already.
  setUserDocument(user: UserDocument) {
    try {
      const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.email}`);
      return userRef.set(user, {
        merge: true
      });
    } catch (ex) {
      throw new Error(`error in setting user document ` + user.email);
    }
  }

  getUserCollections(): Observable<UserDocument[]> {
    const clinic: Clinic = JSON.parse(this.cookieService.get('clinic'));

    const userCollections: AngularFirestoreCollection<UserDocument> = this.fireStore.collection(`users`, ref => {
      return this.clinicConstraint(ref, clinic.id);
    });

    return userCollections.valueChanges();
  }

  getUserDocument(email: string): AngularFirestoreDocument<UserDocument> | null {
    const userDoc: AngularFirestoreDocument<UserDocument> = this.fireStore.doc(`users/${email}`);

    if (userDoc) {
      return userDoc;
    } else {
      return null;
    }
  }

  //If Observable is required for subscribing
  getUserDocumentObservable(email: string) : Observable<UserDocument | undefined> {
    try {
      const userDoc: AngularFirestoreDocument<UserDocument> = this.fireStore.doc(`users/${email}`);

      return userDoc.valueChanges();
    } catch (ex) {
      throw Error("getUserDocumentObservable:" + ex);
    }
  }

  //Update or Add users into the User collection whenever they successfully
  //Log in the app regardless if they have a clinic.
  setLoggedInUserDocument(user: AuthUser) : Observable<UserDocument | undefined> {
    const userRef: AngularFirestoreDocument<UserDocument> = this.fireStore.doc(`users/${user.email}`);

    const userData: UserDocument = {
      email: user.email,
      authUser: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }
    }

    userRef.set(userData, {merge: true});

    return userRef.valueChanges();
  }

  //Used in the User page for Editing isAdmin and isDoctor switches
  updateUserDocument(user: UserDocument) {
    return this.fireStore.doc(`users/${user.email}`)
    .update({
      "isAdmin": user.isAdmin,
      "isDoctor": user.isDoctor
    });
  }
}
