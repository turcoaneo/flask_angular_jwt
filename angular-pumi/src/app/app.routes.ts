import { Route } from '@angular/router';
import {AuthGuardService} from './auth/auth.guards';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then((m) => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact.component').then((m) => m.ContactComponent)
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./components/sign-in/sign-in.component').then((m) => m.SignInComponent)
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./components/logout/logout.component').then((m) => m.LogoutComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/sign-up/sign-up.component').then((m) => m.SignUpComponent)
  },
];
