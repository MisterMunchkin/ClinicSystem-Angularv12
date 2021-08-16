import { Component } from '@angular/core';
import { AuthService } from '../app/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClinicSystem-Angularv12';
  isMenuOpen: boolean = false;

  constructor(
    private authService: AuthService) {}

  onSidenavClick(): void {
    this.isMenuOpen = false;
  }

  async onLogoutClick(): Promise<void> {
    await this.authService.SignOut();
  }
}
