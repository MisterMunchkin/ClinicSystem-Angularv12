import { Patient, PatientHistory } from "../models/patient";

export class FilesHelper {
  //max  file size is 5.24mb
  public static maximumFileSize = 5242880;

  //regex of common file types that should be blocked to prevent viruses
  public static blockedFileTypesRegex: RegExp = /(\.|\/)(bat|exe|cmd|sh|php([0-9])?|pl|cgi|386|dll|com|torrent|js|app|jar|pif|vb|vbscript|wsf|asp|cer|csr|jsp|drv|sys|ade|adp|bas|chm|cpl|crt|csh|fxp|hlp|hta|inf|ins|isp|jse|htaccess|htpasswd|ksh|lnk|mdb|mde|mdt|mdw|msc|msi|msp|mst|ops|pcd|prg|reg|scr|sct|shb|shs|url|vbe|vbs|wsc|wsf|wsh)$/i;

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
