import { DocumentSnapshot } from '@angular/fire/firestore';
import { Clinic } from './clinic';

//Mainly used during authentication
export interface User {
    uid: string;
    email?: string;
    displayName?: string;
    photoURL: string;
    emailVerified: boolean;
}

export interface UserDocument {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL: string;
  emailVerified: boolean;
  isAdmin: boolean;
  isDoctor: boolean;
  clinic: Clinic;
}
