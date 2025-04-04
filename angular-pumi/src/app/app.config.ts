import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {APP_BASE_HREF} from '@angular/common';
import {appRoutes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {JwtInterceptor} from './auth/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([JwtInterceptor])),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    {provide: APP_BASE_HREF, useValue: "/"}
  ]
};
