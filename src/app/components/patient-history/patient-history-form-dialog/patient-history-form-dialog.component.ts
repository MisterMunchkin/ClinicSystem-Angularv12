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
  isEdit: boolean;

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
      this.isEdit = true;
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
      this.isEdit = false;
    }
  }

  onSubmit() {
    if (this.patientHistoryForm.valid) {
      let formGroupValues: PatientHistory = this.patientHistoryForm.value;

      this.patientHistoryData.age = formGroupValues.age;

      //These properties are uneditable. Only populated during add
      if (!this.isEdit) {
        this.patientHistoryData.dateOfVisit = new Date().toLocaleDateString();
        this.patientHistoryData.attendingPhysician.displayName = localStorage.getItem('displayName') ?? '';
        this.patientHistoryData.attendingPhysician.uid = localStorage.getItem('uid') ?? '';
      }

      this.patientHistoryData.diagnosis = formGroupValues.diagnosis;
      this.patientHistoryData.remarks = formGroupValues.remarks;
      this.patientHistoryData.symptoms = formGroupValues.symptoms
      this.patientHistoryData.vitalSigns = {
        bloodPressure: formGroupValues.vitalSigns?.bloodPressure,
        pulseRate: formGroupValues.vitalSigns?.pulseRate,
        respirationRate: formGroupValues.vitalSigns?.respirationRate,
        temperature: formGroupValues.vitalSigns?.temperature
      }

      console.log(this.patientHistoryForm);
      console.log(this.patientHistoryData);

      let result = JSON.parse(JSON.stringify(this.patientHistoryData));
      this.dialogRef.close(result);
    }
  }
}
