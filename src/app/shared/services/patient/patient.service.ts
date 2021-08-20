import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Patient } from '../../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private fireStore: AngularFirestore) { }

  getPatientCollections(): Observable<Patient[]> {
    const patientCollections: AngularFirestoreCollection<Patient> = this.fireStore.collection(`patients`);

    return patientCollections.valueChanges({idField: 'documentId'});
  }

  getPatientDocument(uid: string) {
    const patientDoc: AngularFirestoreDocument<Patient> = this.fireStore.doc(`patients/${uid}`);

    if (patientDoc) {
      return patientDoc;
    } else {
      return null;
    }
  }
}
