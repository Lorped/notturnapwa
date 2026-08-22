import { Component } from '@angular/core';
import { User, pregiodifetto } from '../globals';
import { AuthserviceService } from '../services/authservice.service';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pregi',
  templateUrl: './pregi.page.html',
  styleUrls: ['./pregi.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class PregiPage {
  constructor(public user: User, public auth: AuthserviceService) {}

  listapregi: Array<pregiodifetto> = [];

  ionViewWillEnter() {
    this.auth.getpregi(this.user.idutente).subscribe((data: Array<pregiodifetto>) => {
      this.listapregi = Array.isArray(data) ? [...data] : [];
      //console.log('Pregi e difetti:', this.listapregi);
      
    });
  }
}
