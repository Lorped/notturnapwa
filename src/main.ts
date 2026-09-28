import {
  enableProdMode,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Oggetto } from './app/globals';
import {
  provideHttpClient,
  withXhr,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    InAppBrowser,
    Oggetto,
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
  ],
}).catch((err) => console.log(err));
