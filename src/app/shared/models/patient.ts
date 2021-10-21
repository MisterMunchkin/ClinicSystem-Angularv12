import { Clinic } from "./clinic";
import { FireStoreFile } from "./file";

export interface Patient {
  documentId: string;
  address: string;
  birthDate: Birthdate;
  civilStatus: string;
  gender: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  patientHistory?: PatientHistory[];
  documents?: FireStoreFile[];
  clinic: Clinic;
}

export interface PatientHistory {
  age: string;
  attendingPhysician: AttendingPhysician;
  dateOfVisit: string;
  diagnosis: string;
  remarks?: string;
  symptoms: string;
  vitalSigns?: VitalSigns;
  labResults?: string;
  treatmentPlan?: string;
}

export interface Birthdate {
  day: number;
  month: number;
  year: number;
}

export interface AttendingPhysician {
  displayName: string;
  uid: string;
}

export interface VitalSigns {
  bloodPressure?: string;
  pulseRate?: string;
  respirationRate?: string;
  temperature?: string;
}
