import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RefresherCustomEvent, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../globals';
import { AuthserviceService } from '../services/authservice.service';
import { NgClass } from '@angular/common';
import { TimesPipe } from '../pipes/times.pipe';

export interface datips {
  PScorrenti: number;
  fdv: number;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonicModule, NgClass, TimesPipe],
})
export class Tab1Page {
  public user: User = inject(User);
  private authentication = inject(AuthserviceService);
  private router = inject(Router);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.user.puntiSangueAggiornati
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  ionViewWillEnter() {
    // console.log ("2 user - " , this.user);
  }

  public logoutx() {
    this.router.navigate(['login']);
  }

  doRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      this.authentication
        .loadpscorrenti(this.user.idutente)
        .subscribe((data: datips) => {
          this.user.PScorrenti = data.PScorrenti;
          this.user.fdv = data.fdv;
          this.changeDetectorRef.markForCheck();
        });
      event.target.complete();
    }, 2000);
  }
}
