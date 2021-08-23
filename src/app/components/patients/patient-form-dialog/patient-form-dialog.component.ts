import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/shared/models/patient';

@Component({
  selector: 'app-patient-form-dialog',
  templateUrl: './patient-form-dialog.component.html',
  styleUrls: ['./patient-form-dialog.component.css']
})
export class PatientFormDialogComponent {

  constructor(
  public dialogRef: MatDialogRef<PatientFormDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Patient) {
    console.log(data);
  }

}
