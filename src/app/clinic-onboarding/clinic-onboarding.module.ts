import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicOnboardingComponent } from './clinic-onboarding/clinic-onboarding.component';
import { ClinicOnboardingRoutingModule } from './clinic-onboarding-routing.module';



@NgModule({
  declarations: [
    ClinicOnboardingComponent
  ],
  imports: [
    CommonModule,
    ClinicOnboardingRoutingModule
  ]
})
export class ClinicOnboardingModule { }
