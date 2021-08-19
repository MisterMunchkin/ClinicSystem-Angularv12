export interface Patient {
  address: string;
  birthDate: string;
  civilStatus: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  patientHistory?: PatientHistory;
}

interface PatientHistory {
  age: number;
  attendingPhysician: string;
  dateOfVisit: Date;
  diagnosis?: string;
  remarks?: string;
  symptoms?: string;
  vitalSigns?: string;
}
