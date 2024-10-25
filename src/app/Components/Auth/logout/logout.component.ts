import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout().catch(err => {
      console.error('Logout failed', err);
    });
  }
}
