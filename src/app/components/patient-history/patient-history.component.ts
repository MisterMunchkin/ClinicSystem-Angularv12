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

  addPatientHistory() {
    const dialogRef = this.dialog.open(PatientHistoryFormDialogComponent, {

    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        //Add to the list
        console.log(result);
      }
    });
  }

  editPatientHistory(patientHistory: PatientHistory) {
    const dialogRef = this.dialog.open(PatientHistoryFormDialogComponent, {
      data: patientHistory,

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
