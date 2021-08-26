import { PatientHistory } from './../../shared/models/patient';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientHistoryFormDialogComponent } from './patient-history-form-dialog/patient-history-form-dialog.component';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {
  @Input() patientHistoryCollection: PatientHistory[];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //console.log(this.patientHistory.dateOfVisit.toDateString());
  }

  addPatientVisit() {
    const dialogRef = this.dialog.open(PatientHistoryFormDialogComponent, {
      width: '60%'
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        //Add to the list
        console.log(result);
      }
    });
  }

  editPatientVisit(patientHistory: PatientHistory) {
    const dialogRef = this.dialog.open(PatientHistoryFormDialogComponent, {
      data: patientHistory,
      width: '60%'
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        //Edit the one in the list
        console.log(result);
      }
    });
  }

}
