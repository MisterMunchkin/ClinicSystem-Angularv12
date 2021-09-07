import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AppUiModule } from './app-ui.module';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxFileDragDropModule } from 'ngx-file-drag-drop';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientFormDialogComponent } from './components/patients/patient-form-dialog/patient-form-dialog.component';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';
import { PatientHistoryFormDialogComponent } from './components/patient-history/patient-history-form-dialog/patient-history-form-dialog.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    UsersComponent,
    PatientsComponent,
    PatientFormDialogComponent,
    PatientHistoryComponent,
    PatientHistoryFormDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AppUiModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    ToastrModule.forRoot(),
    NgxFileDragDropModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
