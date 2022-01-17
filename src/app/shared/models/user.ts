import { Clinic } from './clinic';

//Mainly used during authentication
export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface UserDocument {
  email: string; //being used as a reference id to each document in the User Collection
  authUser?: AuthUser;
  isAdmin?: boolean;
  isDoctor?: boolean;
  clinic?: UserClinic;
}

export interface UserClinic {
  id: string,
  address?: string,
  name?: string
}
