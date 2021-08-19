import { OnlydoctorGuard } from './shared/guard/onlydoctor/onlydoctor.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from '../app/components/sign-in/sign-in.component';

import { AuthGuard } from '../app/shared/guard/auth.guard';
import { OnlyadminGuard } from '../app/shared/guard/onlyadmin/onlyadmin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsComponent } from './components/patients/patients.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, OnlyadminGuard]},
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard, OnlydoctorGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
