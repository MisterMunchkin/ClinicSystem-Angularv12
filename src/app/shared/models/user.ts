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
  role: string;
}
