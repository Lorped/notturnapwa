import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent {
  constructor() {
    if (!Capacitor.isNativePlatform()) {
      initializeApp(environment.firebase);
    }
  }
}
