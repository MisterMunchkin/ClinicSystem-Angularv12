import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Clinic } from '../../models/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(
    private fireStore: AngularFirestore
  ) { }
}
