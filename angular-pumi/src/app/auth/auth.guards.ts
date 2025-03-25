import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {inject} from "@angular/core";

export const AuthGuardService: CanActivateFn = () => {

  let isAuthenticated = inject(AuthService).isAuthenticated();
  let router = inject(Router);

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['signin']).then(() => console.log("Not authenticated, redirected to login page."));
    return false;
  }
}
