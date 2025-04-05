import {Component, inject, signal} from '@angular/core';
import {HomeChildComponent} from '../components/home-child/home-child.component';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {JWT_TOKEN_KEY} from '../constants/list';

let initialValue = 'Session in progress';
let expireValue = 'Session will expire in seconds';

@Component({
  selector: 'app-home',
  imports: [HomeChildComponent, NgIf],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeMessage = signal(initialValue);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  isToExpire: boolean = false;
  timeout!: number;

  constructor() {
    this.timeout = this.authService.jwt_expiration_seconds * 1000;
    this.setSessionTimeout();
    this.prepareToExtendSession();
  }

  timeoutId: number = -1;
  prepareResetTimeoutId: number = -1;
  completed: boolean = false;
  running: boolean = false;

  setSessionTimeout = () => {
    this.running = true;
    this.timeoutId = setTimeout(() => {
      this.running = false;
      this.completed = true;
      this.authService.logout();
      this.router.navigate(['/signin'])
        .then(() => console.log('Logged out, redirecting to signin...'));
    }, this.timeout);
    console.log('Timeout Complete');
  };

  prepareToExtendSession = () => {
    if (this.timeoutId > 0) {
      this.prepareResetTimeoutId = setTimeout(() => {
        this.homeMessage.set(expireValue);
        this.isToExpire = true;
      }, this.timeout - 50000);
    }
  }

  resetSessionTimeout = () => {
    this.completed = false;
    this.running = false;
    if (this.prepareResetTimeoutId > 0) {
      clearTimeout(this.prepareResetTimeoutId);
      this.prepareResetTimeoutId = -1;
    }
    if (this.timeoutId > 0) {
      clearTimeout(this.timeoutId);
      this.timeoutId = -1;
      this.homeMessage.set(initialValue);
      this.isToExpire = false;
      console.log('Token refresh: ', localStorage.getItem(JWT_TOKEN_KEY));
      this.authService.refreshJwtToken({email: 'user@admin.ro'}).subscribe(() => {
        console.log('Token refresh: ', localStorage.getItem(JWT_TOKEN_KEY));
        this.timeout = this.authService.jwt_expiration_seconds * 1000;
        this.setSessionTimeout();
        this.prepareToExtendSession();
      });
    }
  };
}
