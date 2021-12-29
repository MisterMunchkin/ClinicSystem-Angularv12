import { UserDocument } from './../../../shared/models/user';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Clinic } from 'src/app/shared/models/clinic';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css']
})
export class UserFormDialogComponent implements OnInit {
  userForm: FormGroup;
  userData: UserDocument;

  cleanDataForm: UserDocument = {
    uid: '',
    email: '',
    displayName: '',
    isAdmin: false,
    isDoctor: false,
    clinic: {id: ''},
    photoURL: '',
    emailVerified: false
  }
  isEdit: boolean = false;

  constructor(public dialogRef: MatDialogRef<UserFormDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: UserDocument,
  private cookieService: CookieService) {
    if (data) {
      //edit user
      this.userData = JSON.parse(JSON.stringify(data));
      this.isEdit = true;
    } else {
      this.userData = this.cleanDataForm;
      var clinic: Clinic = JSON.parse(this.cookieService.get('clinic') ?? '');
      this.userData.clinic = {
        id: clinic.id
      }
      this.isEdit = false;
    }
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      email: new FormControl(this.userData.email, [Validators.required]),
      isAdmin: new FormControl(this.userData.isAdmin),
      isDoctor: new FormControl(this.userData.isDoctor)
    });

    if (this.isEdit === true) {
      this.userForm.get('email')?.disable();
    }
  }

  onSubmit() {
    //to be defined
    if (this.userForm.valid) {
      let formGroupValues = this.userForm.value;

      this.userData.email = formGroupValues.email;
      this.userData.isDoctor = formGroupValues.isDoctor;
      this.userData.isAdmin = formGroupValues.isAdmin;

      this.dialogRef.close(this.userData);
    }
  }
}
