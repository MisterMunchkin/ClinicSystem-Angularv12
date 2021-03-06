import { GenderDB } from './../../../shared/data/gender';
import { CivilStatusDB } from './../../../shared/data/civil-status';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient, PatientHistory } from 'src/app/shared/models/patient';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validatebirthDay, validatebirthMonth, validatebirthYear } from 'src/app/shared/validators/birthday-validator';
import { Clinic } from 'src/app/shared/models/clinic';
import { CookieService } from 'ngx-cookie-service';


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
  cleanDataForm: Patient = {
    documentId: '',
    address: '',
    birthDate: {
      day: 1,
      month: 1,
      year: 2000
    },
    civilStatus: '',
    gender: '',
    firstName: '',
    lastName: '',
    middleName: undefined,
    patientHistory: [],
    clinic: {id: ''}
  }
  isEdit: boolean = false;

  constructor(
  public dialogRef: MatDialogRef<PatientFormDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Patient,
  private cookieService: CookieService) {
    if (data) {
      this.patientData = JSON.parse(JSON.stringify(data));
      this.isEdit = true;
    } else {
      this.patientData = this.cleanDataForm;
      var clinic: Clinic = JSON.parse(this.cookieService.get('clinic') ?? '');
      this.patientData.clinic = {
        id: clinic.id
      }
      this.isEdit = false;
    }
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
    if (this.patientForm.valid) {
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

      this.dialogRef.close(this.patientData);
    }
  }
}
