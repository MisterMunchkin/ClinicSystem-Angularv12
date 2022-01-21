import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicOnboardingComponent } from './clinic-onboarding/clinic-onboarding.component';
import { ClinicOnboardingRoutingModule } from './clinic-onboarding-routing.module';

const uiModules = [
  MatSlideToggleModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatButtonModule
]

@NgModule({
  declarations: [
    ClinicOnboardingComponent
  ],
  imports: [
    CommonModule,
    ClinicOnboardingRoutingModule,
    uiModules
  ],
  exports: [
    uiModules
  ]
})
export class ClinicOnboardingModule { }
