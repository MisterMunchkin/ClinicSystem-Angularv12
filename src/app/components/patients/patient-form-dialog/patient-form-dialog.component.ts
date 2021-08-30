import { GenderDB } from './../../../shared/data/gender';
import { CivilStatusDB } from './../../../shared/data/civil-status';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient, PatientHistory } from 'src/app/shared/models/patient';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validatebirthDay, validatebirthMonth, validatebirthYear } from 'src/app/shared/validators/birthday-validator';

@Component({
  selector: 'app-patient-form-dialog',
  templateUrl: './patient-form-dialog.component.html',
  styleUrls: ['./patient-form-dialog.component.css']
})
export class PatientFormDialogComponent implements OnInit {
  patientForm: FormGroup;
  civilStatusNames: string[] = CivilStatusDB.civilStatusNames;
  genderNames: string[] = GenderDB.genderNames;
  patientHistoryCollection: PatientHistory[];

  patientData: Patient;

  constructor(
  public dialogRef: MatDialogRef<PatientFormDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Patient,
  private formBuilder: FormBuilder) {
    this.patientData = JSON.parse(JSON.stringify(data));
  }

  ngOnInit(){
    this.patientForm = new FormGroup({
      address: new FormControl(this.patientData.address),
      birthMonth: new FormControl(this.patientData.birthDate.month, [Validators.required]),
      birthYear: new FormControl(this.patientData.birthDate.year, [Validators.required]),
      birthDay: new FormControl(this.patientData.birthDate.day, Validators.required),
      civilStatus: new FormControl(this.patientData.civilStatus, Validators.required),
      firstName: new FormControl(this.patientData.firstName, Validators.required),
      gender: new FormControl(this.patientData.gender, Validators.required),
      lastName: new FormControl(this.patientData.lastName, Validators.required),
      middleName: new FormControl(this.patientData.middleName)
    }, {validators: [validatebirthDay, validatebirthMonth, validatebirthYear]} );

    this.patientHistoryCollection = this.patientData.patientHistory ?? [];
  }

  onSubmit() {
    let formGroupValues = this.patientForm.value;

    this.patientData.address = formGroupValues.address;
    this.patientData.birthDate.day = formGroupValues.birthDay;
    this.patientData.birthDate.month = formGroupValues.birthMonth;
    this.patientData.birthDate.year = formGroupValues.birthYear;
    this.patientData.civilStatus = formGroupValues.civilStatus;
    this.patientData.firstName = formGroupValues.firstName;
    this.patientData.gender = formGroupValues.gender;
    this.patientData.lastName = formGroupValues.lastName;
    this.patientData.middleName = formGroupValues.middleName;

    console.log(this.patientData);
    console.log(this.patientForm);
  }
}
