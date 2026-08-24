import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Legame, Utente, User } from '../globals';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';

export interface fullegami {
  target: Array<Legame>;
  domitor: Array<Utente>;
}

@Component({
  selector: 'app-legami',
  templateUrl: './legami.page.html',
  styleUrls: ['./legami.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class LegamiPage implements OnInit {
  listalegami: Array<Legame> = [];
  listautenti: Array<Utente> = [];

  pgscelto: number = 0;
  selected: string = '';

  constructor(
    public user: User,
    public router: Router,
    public authService: AuthserviceService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadUtenti(this.user.idutente);
    this.getlegami();

  }

  loadUtenti(a: number) {
    this.authService.listautenti(a).subscribe((res: Array<Utente>) => {
      this.listautenti = res;
      //console.log('utenti: ', this.listautenti);
    });
  }

  invia() {
    this.authService.invialegame(this.user.idutente, this.pgscelto).subscribe(() => {
      this.getlegami();
    });
    //console.log(mypost);
  }

  getlegami() {
    this.authService.getlegami(this.user.idutente).subscribe((res: fullegami) => {
      this.listalegami = res.target;
      //console.log('legami: ', this.listalegami);
    });
  }

}
