import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyadminGuard implements CanActivate {
  private loader$ = new Subject<boolean>();
  public loader = false;

  constructor(
    private authService: AuthService){
      this.loader$.pipe(debounceTime(300)).subscribe(loader => {
        this.loader = loader;
      });
    }

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
