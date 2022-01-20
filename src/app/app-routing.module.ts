import { OnlydoctorGuard } from './shared/guard/onlydoctor/onlydoctor.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from '../app/components/sign-in/sign-in.component';

import { AuthGuard } from '../app/shared/guard/auth.guard';
import { OnlyadminGuard } from '../app/shared/guard/onlyadmin/onlyadmin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsComponent } from './components/patients/patients.component';
import { UsersComponent } from './components/users/users.component';
import { HasclinicGuard } from './shared/guard/hasclinic/hasclinic.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'clinic-onboarding',
  loadChildren: () => import('./clinic-onboarding/clinic-onboarding.module').then(c => c.ClinicOnboardingModule),
  canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, HasclinicGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, HasclinicGuard, OnlyadminGuard]},
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard, HasclinicGuard, OnlydoctorGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
