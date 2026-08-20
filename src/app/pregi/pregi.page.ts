import { Component, OnInit } from '@angular/core';
import { User, pregiodifetto } from '../globals';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-pregi',
  templateUrl: './pregi.page.html',
  styleUrls: ['./pregi.page.scss'],
  standalone: false,
})
export class PregiPage implements OnInit {
  constructor(public user: User, public auth: AuthserviceService) {}

  listapregi: Array<pregiodifetto> = [];

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.auth.getpregi(this.user.idutente).subscribe((data) => {
      Object.assign(this.listapregi, data);
      //console.log('Pregi e difetti:', this.listapregi);
    });
  }
}
