import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { User, Oggetto, ToChange } from './globals';
import { PipesModule } from './pipes/pipes.module';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, PipesModule, ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })], providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, User, Oggetto, BarcodeScanner, InAppBrowser, ToChange, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
