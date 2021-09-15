import { FireStoreFile } from './../../shared/models/file';
import { PatientFormDialogComponent } from './patient-form-dialog/patient-form-dialog.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MonthsDB } from 'src/app/shared/data/months';
import { Birthdate, Patient } from 'src/app/shared/models/patient';
import { PatientService } from 'src/app/shared/services/patient/patient.service';
import { ToastrService } from 'ngx-toastr';
import { FilesHelper } from 'src/app/shared/data/files';

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
    private toastr: ToastrService) {}

  ngAfterViewInit(): void {
    this.isLoading$ = true;
    this.patientService.getPatientCollections()
    .subscribe(data => {
      console.log(data);
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
      this.toastr.success('New patient has been saved!', 'Success', {
        tapToDismiss: true,
        easing: 'ease-in'
      });
    }, error => {
      this.toastr.error('Something went wrong', 'Error', {
        tapToDismiss: true,
        easing: 'ease-in'
      });
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
      this.toastr.success('Changes have been saved!', 'Success', {
        tapToDismiss: true,
        easing: 'ease-in'
      });
    }, error => {
      this.toastr.error('Something went wrong', 'Error', {
        tapToDismiss: true,
        easing: 'ease-in'
      });
      console.log(error);
    });
  }


  getFilePath(patientDocument: Patient) {
    return FilesHelper.getPatientHistoryFilePath(patientDocument);
  }

  saveFireStoreFile(fireStoreFile: FireStoreFile, patient: Patient) {
    if (!patient.documents) {
      patient.documents = [];
    }

    patient.documents.push(fireStoreFile);
    this.patientService.updatePatientDocument(patient)
    .then(data => {
      this.toastr.success('File uploaded!', 'Success', {
        tapToDismiss: true,
        easing: 'ease-in'
      });
    }, error => {
      this.toastr.error('Something went wrong', 'Error', {
        tapToDismiss: true,
        easing: 'ease-in'
      });
      console.log(error);
    })
  }
}
