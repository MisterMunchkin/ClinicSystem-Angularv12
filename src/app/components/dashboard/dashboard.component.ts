import { UserService } from './../../shared/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');

    this.userService.getUserDocumentObservable(user.uid).subscribe(userDoc => {
      console.log(userDoc);
    });
  }
}
