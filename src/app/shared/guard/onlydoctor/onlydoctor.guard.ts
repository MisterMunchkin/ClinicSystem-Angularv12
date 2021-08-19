import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlydoctorGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const isDoctor = await this.authService.isDoctor();

    if (!isDoctor) {
      alert('UnAuthorized');
      return false;
    } else {
      return true;
    }
  }

}
