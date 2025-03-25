import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {APP_BASE_HREF} from '@angular/common';
import {appRoutes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    {provide: APP_BASE_HREF, useValue: "/"}
  ]
};
