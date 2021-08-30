import { VitalSigns } from './../../../shared/models/patient';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { PatientHistory } from 'src/app/shared/models/patient';

@Component({
  selector: 'app-patient-history-form-dialog',
  templateUrl: './patient-history-form-dialog.component.html',
  styleUrls: ['./patient-history-form-dialog.component.css']
})
export class PatientHistoryFormDialogComponent implements OnInit {
  patientHistoryForm: FormGroup;
  patientHistoryData: PatientHistory;
  dateOfVisit: string;

  constructor(
    public dialogRef: MatDialogRef<PatientHistoryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PatientHistory
  ) {
    this.patientHistoryData = JSON.parse(JSON.stringify(data));
  }

  ngOnInit(): void {
    if (this.patientHistoryData) {
      //has data for edit
      this.patientHistoryForm = new FormGroup({
        age: new FormControl(this.patientHistoryData.age, [Validators.required]),
        diagnosis: new FormControl(this.patientHistoryData.diagnosis),
        remarks: new FormControl(this.patientHistoryData.remarks),
        symptoms: new FormControl(this.patientHistoryData.symptoms),
        vitalSigns: new FormGroup({
          bloodPressure: new FormControl(this.patientHistoryData.vitalSigns?.bloodPressure),
          pulseRate: new FormControl(this.patientHistoryData.vitalSigns?.pulseRate),
          respirationRate: new FormControl(this.patientHistoryData.vitalSigns?.respirationRate),
          temperature: new FormControl(this.patientHistoryData.vitalSigns?.temperature)
        })
      });
    } else {
      //has no data for add
      this.patientHistoryForm = new FormGroup({
        age: new FormControl('', [Validators.required]),
        diagnosis: new FormControl(''),
        remarks: new FormControl(''),
        symptoms: new FormControl(''),
        vitalSigns: new FormGroup({
          bloodPressure: new FormControl(''),
          pulseRate: new FormControl(''),
          respirationRate: new FormControl(''),
          temperature: new FormControl('')
        })
      });
    }
  }

  onSubmit() {
    console.log(this.patientHistoryForm);
  }
}
