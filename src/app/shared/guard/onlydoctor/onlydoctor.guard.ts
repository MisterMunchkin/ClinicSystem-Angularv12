import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnlydoctorGuard implements CanActivate {
  private loader$ = new Subject<boolean>();
  public loader = false;

  constructor(
    private authService: AuthService
  ){
    this.loader$.pipe(debounceTime(300)).subscribe(loader => {
      this.loader = loader;
    });
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    this.loader$.next(true);

    const isDoctor = await this.authService.isDoctor();

    this.loader$.next(false);
    if (!isDoctor) {
      alert('UnAuthorized');
      return false;
    } else {
      return true;
    }
  }

}
