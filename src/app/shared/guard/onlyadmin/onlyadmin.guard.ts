import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyadminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const isAdmin =  await this.authService.isAdmin();

    if (!isAdmin) {
      alert('UnAuthorized');
      return false;
    } else {
      return true;
    }
  }

}
