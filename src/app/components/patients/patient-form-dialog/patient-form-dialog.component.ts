import { GenderDB } from './../../../shared/data/gender';
import { CivilStatusDB } from './../../../shared/data/civil-status';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient, PatientHistory } from 'src/app/shared/models/patient';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-form-dialog',
  templateUrl: './patient-form-dialog.component.html',
  styleUrls: ['./patient-form-dialog.component.css']
})
export class PatientFormDialogComponent {
  patientForm: FormGroup;
  civilStatusNames: string[] = CivilStatusDB.civilStatusNames;
  genderNames: string[] = GenderDB.genderNames;
  patientHistoryCollection: PatientHistory[];

  patientData: Patient;

  constructor(
  public dialogRef: MatDialogRef<PatientFormDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Patient,
  private formBuilder: FormBuilder) {
    console.log(data);
    this.patientData = JSON.parse(JSON.stringify(data));

    this.patientForm = this.formBuilder.group({
      address: data.address,
      birthMonth: data.birthDate.month,
      birthYear: data.birthDate.year,
      birthDay: data.birthDate.day,
      civilStatus: data.civilStatus,
      firstName: data.firstName,
      gender: data.gender,
      lastName: data.lastName,
      middleName: data.middleName
    });

    this.patientHistoryCollection = data.patientHistory ?? [];
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
  }
}
