export interface Patient {
  documentId: string;
  address: string;
  birthDate: Birthdate;
  civilStatus: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  patientHistory?: PatientHistory[];
}

interface PatientHistory {
  age: number;
  attendingPhysician: AttendingPhysician;
  dateOfVisit: Date;
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
  bloodPressure: 120;
  pulseRate: 0;
  respirationRate: 0;
  temperature: 36
}
