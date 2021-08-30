import { Timestamp } from "rxjs/internal/operators/timestamp";

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
}

export interface PatientHistory {
  age: number;
  attendingPhysician: AttendingPhysician;
  dateOfVisit: string;
  diagnosis?: string;
  remarks?: string;
  symptoms?: string;
  vitalSigns?: VitalSigns;
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
