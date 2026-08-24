import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User, Potere, Userskill } from '../globals';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthserviceService } from '../services/authservice.service';
import { AlertController } from '@ionic/angular';

export interface EsitoPotere {
  tiro: number;
}

@Component({
  selector: 'app-poteri',
  templateUrl: './poteri.page.html',
  styleUrls: ['./poteri.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class PoteriPage implements OnInit {
  disc = 0;
  nomed = '';
  CacciaAnimalita = 1;

  mypoteri: Array<Potere> = [];

  esito: EsitoPotere = { 
    tiro: 0
  };

  constructor(
    public router: Router,
    public user: User,
    public userskill: Userskill,
    public activatedroute: ActivatedRoute,

    public authservice: AuthserviceService,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {  }

  ionViewWillEnter() {
    // console.log ("poteripage..");

    this.activatedroute.paramMap.subscribe((paramMap) => {
      this.disc = Number(paramMap.get('disc'));
      this.nomed = paramMap.get('nomed')!;
      // console.log(paramMap);
    });

    for (let i = 0; i < this.userskill.discipline.length; i++) {
      if (this.userskill.discipline[i].iddisciplina == this.disc) {
        this.mypoteri = this.userskill.discipline[i].poteri;
        // console.log(this.mypoteri);
      }
    }
  }

  gopotere(pot: string, livellopot: number, idpotere: number) {
    // console.log(pot);

    if (pot == 'Telepatia') {
      this.router.navigate(['/tabs/telepatia']);
    } else {

      this.authservice.usopotere(this.user['idutente'], pot, idpotere,  livellopot, this.nomed).subscribe((res) => {

        this.esito.tiro = res.tiro;

        console.log('esito potere: ' + this.esito.tiro);


        
        if (livellopot == 5 ) {
          this.user.PScorrenti = this.user.PScorrenti - 2;
        } else {
          this.user.PScorrenti = this.user.PScorrenti - 1;
        }
        if (idpotere== 15) {
          this.user.nummaesta = this.user.nummaesta - 1;
        }

        this.showalert(pot, livellopot);

        if (this.user.PScorrenti <= this.user.frenesia) {
          console.log('a rischio frenesia');
        } else if (this.user.PScorrenti <= this.user.cacciaobbligata) {
          console.log('in caccia obbligata');
        } 

      });
    }
  }

  async showalert(pot: string, livellopot: number) {
    const alert = await this.alertCtrl.create({
      header: pot,
      subHeader: this.nomed + ' (Livello ' + livellopot + ')',
      message: '[Tiro contrapposto: ' + this.esito.tiro + ']',
      buttons: ['OK'],
      cssClass: 'myalert',
    });
    alert.present();
  }

  cacciaanim() {
    this.authservice.cacciaanim(this.user['idutente']).subscribe(() => {
      this.user['PScorrenti'] = this.user['PScorrenti'] + 3 > this.user['maxps'] ? this.user['maxps'] : this.user['PScorrenti'] + 3;
      this.showalert('Richiamo', 3);
      this.CacciaAnimalita = 1;
      // this.router.navigate(['/tabs/tab5']);
    });
  }

    

  
}
