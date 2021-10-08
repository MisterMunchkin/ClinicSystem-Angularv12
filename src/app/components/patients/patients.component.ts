import { FileUploadService } from './../../shared/services/file-upload/file-upload.service';
import { FireStoreFile } from './../../shared/models/file';
import { PatientFormDialogComponent } from './patient-form-dialog/patient-form-dialog.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MonthsDB } from 'src/app/shared/data/months';
import { Birthdate, Patient } from 'src/app/shared/models/patient';
import { PatientService } from 'src/app/shared/services/patient/patient.service';
import { FilesHelper } from 'src/app/shared/data/files';
import { ToastrHelperService } from 'src/app/shared/services/toastr/toastr-helper.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<Patient>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'gender', 'birthdate', 'civilStatus', 'files', 'actions'];
  isLoading$: boolean;
  dataSource: MatTableDataSource<Patient>;

  constructor(
    private patientService: PatientService,
    private dialog: MatDialog,
    private toastr: ToastrHelperService,
    private fileUpload: FileUploadService) {}

  ngAfterViewInit(): void {
    this.isLoading$ = true;
    this.patientService.getPatientCollections()
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.table.dataSource = this.dataSource;
      this.isLoading$ = false;
    }, error => {
      this.isLoading$ = false;
      console.log(error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  addPatientDialog() {
    const dialogRef = this.dialog.open(PatientFormDialogComponent, {
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        this.addPatientDataService(result);
      }
    });
  }

  addPatientDataService(patientData: Patient) {
    this.patientService.addPatientDocument(patientData)
    .then(data => {
      this.toastr.successToastr('New patient has been saved!',  'Success');
    }, error => {
      this.toastr.errorToastr();
      console.log(error);
    })
  }

  getBirthdateString(birthdate: Birthdate): string {
    const monthName = MonthsDB.monthNames[birthdate.month - 1];

    return monthName + ' ' + birthdate.day + ', ' + birthdate.year;
  }

  editPatientDialog(patient: Patient) {
    const dialogRef = this.dialog.open(PatientFormDialogComponent, {
      data: patient
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        this.editPatientDataService(result);
      }
    });
  }

  editPatientDataService(patientData: Patient) {
    this.patientService.updatePatientDocument(patientData)
    .then(data => {
      this.toastr.successToastr('Changes have been saved!', 'Success');
    }, error => {
      this.toastr.errorToastr();
      console.log(error);
    });
  }


  getFilePath(patientDocument: Patient) {
    return FilesHelper.getPatientHistoryFilePath(patientDocument);
  }

  removeFile(file: FireStoreFile, patient: Patient) {
    this.fileUpload.removeFile(file.downloadableUrl);

    //remove the document from firestore
    const index = patient.documents?.findIndex(d => d.downloadableUrl === file.downloadableUrl);
    if (index === undefined) {
     // patient.documents?.splice(index, 1);
      this.patientService.updatePatientDocument(patient)
      .then(data => {
        this.toastr.successToastr(`File ${file.name} removed!`, 'Success');
      }, error => {
        this.toastr.errorToastr();
        console.log(error);
      });
    } else {
      //this.toastr.errorToastr("Something went wrong. Could not find document from documents in patient object");
      throw new Error('Something went wrong. Could not find document from documents in patient object')
    }
  }

  saveFireStoreFile(fireStoreFile: FireStoreFile | null, patient: Patient) {
    if (!patient.documents) {
      patient.documents = [];
    }

    if (fireStoreFile) {
      patient.documents.push(fireStoreFile);
      this.patientService.updatePatientDocument(patient)
      .then(data => {
        this.toastr.successToastr('File uploaded!', 'Success');
      }, error => {
        this.toastr.errorToastr();
        console.log(error);
      });
    }
  }
}
