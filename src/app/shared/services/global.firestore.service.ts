import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GlobalFirestoreService {

  constructor(
  ) {}

  clinicConstraint(ref: CollectionReference<DocumentData>, clinicId: string) {
    return  ref
    .where('clinic', '!=', null)
    .where('clinic.id', '==', clinicId)
  }
}
