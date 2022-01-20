import { ClinicOnboardingComponent } from './clinic-onboarding/clinic-onboarding.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ClinicOnboardingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicOnboardingRoutingModule { }
