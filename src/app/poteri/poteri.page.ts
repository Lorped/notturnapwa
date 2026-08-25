import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User, Potere, Userskill, Utente } from '../globals';
import { ActivatedRoute } from '@angular/router';
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

  canDismiss = false;   // per il modal
  presentingElement: HTMLElement | null = null;   // per il modal
  messaggioTelepatico = '';
  isModalOpen = false;

  listautenti: Array<Utente> = [];
  pgscelto = 0;


  constructor(
    public user: User,
    public userskill: Userskill,
    public activatedroute: ActivatedRoute,
    public authservice: AuthserviceService,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() { 
    this.authservice.listautenti(this.user.idutente).subscribe((res: Array<Utente>) => {
      this.listautenti = res;
    });
  }

  ionViewWillEnter() {
    
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
      this.pgscelto = 0;
      this.messaggioTelepatico = '';
      this.isModalOpen = true;
    } else {

      this.authservice.usopotere(this.user['idutente'], pot, idpotere,  livellopot, this.nomed).subscribe((res) => {

        this.esito.tiro = res.tiro;

        // console.log('esito potere: ' + this.esito.tiro);

        
        if (livellopot == 5 ) {
          this.user.PScorrenti = this.user.PScorrenti - 2;
        } else {
          this.user.PScorrenti = this.user.PScorrenti - 1;
        }
        if (idpotere== 15) {
          this.user.nummaesta = this.user.nummaesta - 1;
        }

        if (this.nomed == 'Ascendente' || this.nomed == 'Dominazione' || this.nomed == 'Demenza' || this.nomed == 'Serpentis'  ) {
          this.showalert(pot, livellopot,"T");
        } else {
          this.showalert(pot, livellopot, "NT");
        }

        if (this.user.PScorrenti <= this.user.frenesia) {
          console.log('a rischio frenesia');
        } else if (this.user.PScorrenti <= this.user.cacciaobbligata) {
          console.log('in caccia obbligata');
        } 

      });
    }
  }

  async showalert(pot: string, livellopot: number, tipo: string) {

    let messaggio = '';
    if (tipo == "T") {
      messaggio = '[Tiro contrapposto: ' + this.esito.tiro + ']';
    } else {
      messaggio = '';
    }

    const alert = await this.alertCtrl.create({
      header: pot,
      subHeader: this.nomed + ' (Livello ' + livellopot + ')',
      message: messaggio,
      buttons: ['OK'],
      cssClass: 'myalert',
    });
    alert.present();
  }

  cacciaanim() {
    this.authservice.cacciaanim(this.user['idutente']).subscribe(() => {
      this.user['PScorrenti'] = this.user['PScorrenti'] + 3 > this.user['maxps'] ? this.user['maxps'] : this.user['PScorrenti'] + 3;
      this.showalert('Richiamo', 3, "NT");
      this.CacciaAnimalita = 0;

      setTimeout(() => {
        this.CacciaAnimalita = 1;
      }, 3600000); // 60 minuti in millisecondi 
      

    });
  }

    
  mandaMessaggio() {
    this.isModalOpen = false;
    // console.log('mandaMessaggio: ' + this.messaggioTelepatico);
    // console.log('pgscelto: ' + this.pgscelto);
    this.authservice.inviamessaggiotente(this.user['idutente'], this.pgscelto, this.messaggioTelepatico).subscribe(() => {
      this.user['PScorrenti']--;
      this.showalert('Telepatia', 1, "NT");
      this.pgscelto = 0;
      this.messaggioTelepatico = '';
    });

  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  
}
