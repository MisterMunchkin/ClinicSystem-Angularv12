import { Patient, PatientHistory } from "../models/patient";

export class FilesHelper {
  //max  file size is 5.24mb
  public static maximumFileSize = 5242880;

  //File path is patient document id/ date of visit/ file.docx
  // public static getPatientHistoryFilePath(patient: Patient, patientHistory: PatientHistory){
  //   return patient.documentId + '/' + this.changeDateStringFormat(patientHistory.dateOfVisit) + '/';
  // }
  public static getPatientHistoryFilePath(patient: Patient){
    return patient.documentId + '/';
  }

  static changeDateStringFormat(date: string){
    return date.replaceAll('/', '-');
  }
}
