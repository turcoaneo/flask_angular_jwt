import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./components/sign-in/sign-in.component').then((m) => m.SignInComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/sign-up/sign-up.component').then((m) => m.SignUpComponent)

  },
];
