import { UserService } from './../../shared/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/shared/models/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    const user: AuthUser = JSON.parse(this.cookieService.get('user') || '{}');

    this.userService.getUserDocumentObservable(user.email).subscribe(userDoc => {
      console.log(userDoc);
    });
  }
}
