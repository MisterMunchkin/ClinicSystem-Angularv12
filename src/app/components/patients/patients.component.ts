import { PatientFormDialogComponent } from './patient-form-dialog/patient-form-dialog.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MonthsDB } from 'src/app/shared/data/months';
import { Birthdate, Patient } from 'src/app/shared/models/patient';
import { PatientService } from 'src/app/shared/services/patient/patient.service';
import { PatientsDataSource } from './patients-datasource';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<Patient>;
  dataSource: PatientsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'gender', 'birthdate', 'civilStatus', 'actions'];
  //displayedColumns = ['id', 'name'];
  isLoading$: boolean;

  constructor(
    private patientService: PatientService,
    private dialog: MatDialog,
    private toastr: ToastrService) {}

  ngAfterViewInit(): void {
    this.isLoading$ = true;
    this.patientService.getPatientCollections()
    .subscribe(data => {
      this.table.dataSource = new PatientsDataSource(data);
      this.isLoading$ = false;
    }, error => {
      this.isLoading$ = false;
      console.log(error);
    })
  }

  getBirthdateString(birthdate: Birthdate): string {
    const monthName = MonthsDB.monthNames[birthdate.month - 1];

    return monthName + ' ' + birthdate.day + ', ' + birthdate.year;
  }

  editPatientDialog(patient: Patient) {
    const dialogRef = this.dialog.open(PatientFormDialogComponent, {
      data: patient,
      width: '90%'
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
}
