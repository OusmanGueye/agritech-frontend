import {ApplicationConfig, importProvidersFrom, inject, LOCALE_ID, isDevMode} from '@angular/core';
import {
  NavigationError,
  provideRouter, Router,
  RouterFeatures,
  withComponentInputBinding, withDebugTracing,
  withNavigationErrorHandler
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { routes } from './app.routes';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {DEBUG_INFO_ENABLED} from "./app.constants";
import {BrowserModule} from "@angular/platform-browser";
import {httpInterceptorProviders} from "./core/interceptor";
import {provideServiceWorker, ServiceWorkerModule} from '@angular/service-worker';

const routerFeatures: RouterFeatures[] = [
  withComponentInputBinding(),
  withNavigationErrorHandler((e: NavigationError) => {
    const router = inject(Router);
    if (e.error.status === 403) {
      router.navigate(['/accessdenied']);
    } else if (e.error.status === 404) {
      router.navigate(['/404']);
    } else if (e.error.status === 401) {
      router.navigate(['/login']);
    } else {
      router.navigate(['/error']);
    }
  }),
];
// if (DEBUG_INFO_ENABLED) {
//   routerFeatures.push(withDebugTracing());
// }


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(BrowserModule),
    // Set this to true to enable service worker (PWA)
    importProvidersFrom(ServiceWorkerModule.register('ngsw-worker.js', { enabled: true })),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes, ...routerFeatures),
    {
        provide: DateAdapter,
        useFactory: adapterFactory
    },
    { provide: LOCALE_ID, useValue: 'fr' },
    httpInterceptorProviders,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }).providers!,
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
]
};


