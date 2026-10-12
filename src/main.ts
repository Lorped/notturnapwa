import {
  enableProdMode,
  inject,
  isDevMode,
  provideAppInitializer,
  importProvidersFrom,
} from '@angular/core';

import { environment } from './environments/environment';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
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
import { UpdateService } from './app/services/update.service';

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
    Oggetto,
    provideAppInitializer(() => inject(UpdateService).init()),
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
  ],
}).catch((err) => console.log(err));
