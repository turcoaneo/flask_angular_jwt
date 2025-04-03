import {Component, inject} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  authService = inject(AuthService);
  router = inject(Router);
  constructor() {
    this.authService.logout();
    setTimeout(() => {
      console.log('sleep');
      this.router.navigate(['/signin'])
        .then(() => console.log('Logged out, redirecting to signin...'));
    }, 1000);
  }
}
