import { GlobalFirestoreService } from './../global.firestore.service';
import { Patient } from 'src/app/shared/models/patient';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { Clinic } from '../../models/clinic';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends GlobalFirestoreService {

  constructor(
    private fireStore: AngularFirestore,
    private cookieService: CookieService) {
      super();
  }

  addPatientDocument(patientDocument: Patient): Promise<void> {
    const patientRef: AngularFirestoreDocument<Patient> = this.fireStore.collection(`patients`).doc();

    patientDocument.documentId = patientRef.ref.id;
    return patientRef.set(patientDocument);
  }

  //Gets real time updates of patient collection
  getPatientCollections(): Observable<Patient[]> {
    const clinic: Clinic = JSON.parse(this.cookieService.get('clinic'));

    const patientCollections: AngularFirestoreCollection<Patient> = this.fireStore
    .collection(`patients`, ref => {
      return this.clinicConstraint(ref, clinic.id);
    });

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

  //updates patient document and returns a promise
  updatePatientDocument(patientDocument: Patient): Promise<void> {
    const patientRef: AngularFirestoreDocument<Patient> = this.fireStore.doc(`patients/${patientDocument.documentId}`);
    return patientRef.set(patientDocument, {
      merge: true
    });
  }
}
