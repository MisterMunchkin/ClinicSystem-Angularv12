import { User } from './../../../shared/models/user';
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

  cleanDataForm: PatientHistory = {
    age: '',
    attendingPhysician: {
      displayName: '',
      uid: ''
    },
    dateOfVisit: new Date().toLocaleDateString(),
    diagnosis: '',
    remarks: '',
    symptoms: '',
    vitalSigns: {
      bloodPressure: '',
      pulseRate: '',
      respirationRate: '',
      temperature: ''
    },
    treatmentPlan: '',
    labResults: '',
    documents: []
  };

  constructor(
    public dialogRef: MatDialogRef<PatientHistoryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PatientHistory
  ) {
    if (data) {
      this.patientHistoryData = JSON.parse(JSON.stringify(data));
      this.isEdit = true;
    } else {
      this.patientHistoryData = this.cleanDataForm;
      var user: User = JSON.parse(localStorage.getItem('user') ?? '');
      this.patientHistoryData.attendingPhysician = {
        uid: user.uid,
        displayName: user.displayName ?? ''
      }
      this.isEdit = false;
    }
  }

  ngOnInit(): void {
    if (this.isEdit) {
      //has data for edit
      this.patientHistoryForm = new FormGroup({
        age: new FormControl(this.patientHistoryData.age),
        diagnosis: new FormControl(this.patientHistoryData.diagnosis, [Validators.required]),
        remarks: new FormControl(this.patientHistoryData.remarks),
        symptoms: new FormControl(this.patientHistoryData.symptoms, [Validators.required]),
        vitalSigns: new FormGroup({
          bloodPressure: new FormControl(this.patientHistoryData.vitalSigns?.bloodPressure),
          pulseRate: new FormControl(this.patientHistoryData.vitalSigns?.pulseRate),
          respirationRate: new FormControl(this.patientHistoryData.vitalSigns?.respirationRate),
          temperature: new FormControl(this.patientHistoryData.vitalSigns?.temperature)
        }),
        labResults: new FormControl(this.patientHistoryData.labResults),
        treatmentPlan: new FormControl(this.patientHistoryData.treatmentPlan),
        documents: new FormControl(this.patientHistoryData.documents)
      });
    } else {
      //has no data for add
      this.patientHistoryForm = new FormGroup({
        age: new FormControl('', [Validators.required]),
        diagnosis: new FormControl('', [Validators.required]),
        remarks: new FormControl(''),
        symptoms: new FormControl('', [Validators.required]),
        vitalSigns: new FormGroup({
          bloodPressure: new FormControl(''),
          pulseRate: new FormControl(''),
          respirationRate: new FormControl(''),
          temperature: new FormControl('')
        }),
        labResults: new FormControl(''),
        treatmentPlan: new FormControl(''),
        documents: new FormControl('')
      });
    }
  }

  // onDocumentUpload(event: any) {
  //   //do something
  //   for (var i = 0; i < event.target.files.length; i++) {
  //     this.myDocuments.push(event.target.files[i]);
  //   }
  // }

  onSubmit() {
    if (this.patientHistoryForm.valid) {
      let formGroupValues: PatientHistory = this.patientHistoryForm.value;

      this.patientHistoryData.age = formGroupValues.age?.toString();

      this.patientHistoryData.diagnosis = formGroupValues.diagnosis;
      this.patientHistoryData.remarks = formGroupValues.remarks;
      this.patientHistoryData.symptoms = formGroupValues.symptoms
      this.patientHistoryData.vitalSigns = {
        bloodPressure: formGroupValues.vitalSigns?.bloodPressure,
        pulseRate: formGroupValues.vitalSigns?.pulseRate,
        respirationRate: formGroupValues.vitalSigns?.respirationRate,
        temperature: formGroupValues.vitalSigns?.temperature
      }
      this.patientHistoryData.labResults = formGroupValues.labResults;
      this.patientHistoryData.treatmentPlan = formGroupValues.treatmentPlan;
      this.patientHistoryData.documents = formGroupValues.documents;

      let result = JSON.parse(JSON.stringify(this.patientHistoryData));

      console.log("patient history data----");
      console.log(this.patientHistoryData);
      console.log("result----");
      console.log(result);

      this.dialogRef.close(result);
    }
  }
}
