import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClinicSystem-Angularv12';
  isMenuOpen: boolean = false;

  onSidenavClick(): void {
    this.isMenuOpen = false;
  }
}
