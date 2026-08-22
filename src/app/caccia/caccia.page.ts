import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { pregiodifetto, User, Userskill } from '../globals';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-caccia',
  templateUrl: './caccia.page.html',
  styleUrls: ['./caccia.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class CacciaPage implements OnInit {
  duratacaccia = 10; /* base 10 minuti */
  minuti = 10;
  secondi = 0;
  min_string = '10';
  secondi_string = '00';




  statocaccia = 0;  //   0 - prima , 1 - in corso, 2 - finita
  hidevalue = false
  timer: any;

  metab = 0;  // metab. effic  -3 min
  zanne = 0; // zanne spuntate +2 min
  gregge = 0; // -1 min / livello
  bs = 0; // bacio selvaggio -50%
  bspossibile = 0; // bacio selvaggio possibile

  pregi: Array<pregiodifetto> = [];

  recuperati = 0;
  timestart = 0;

  constructor(
    private http: HttpClient,
    public user: User,
    public userskill: Userskill,
    public authservice: AuthserviceService,
  ) {}

  ngOnInit() {
    const pot = this.userskill.discipline.find((d) => d.iddisciplina == 17);  // potenza
    if (pot) {
      const bb = pot.poteri.find((p) => p.idpotere == 54); // bacio selvaggio
      if (bb) {
        this.bspossibile = 1;
      }
    }
  }

  ionViewWillEnter() {
   
      const oldstart = window.localStorage.getItem(
        'NotturnaCacciaTimestart',
      );
      const olddurata = window.localStorage.getItem(
        'NotturnaDurataCaccia',
      );

      if (olddurata && oldstart && this.user.incaccia == 0) {
        console.log ('riprendo la caccia in corso');
        this.statocaccia = 1;
        this.user.incaccia = 1;
        this.timestart = parseInt(oldstart);
        this.duratacaccia = parseInt(olddurata);
        this.StartTimer();
      }


  }

  iniziocaccia() {
    this.user.incaccia = 1;

    const gg = this.userskill.background.find((b) => b.idback == 11);
    if (gg) {
      this.gregge = gg.livello;
    }

    this.authservice.getpregi(this.user.idutente).subscribe((data) => {
      Object.assign(this.pregi, data);

      const metab = this.pregi.find((p) => p.idpregio == 5);
      if (metab) {
        this.metab = 3;
      }
      const zanne = this.pregi.find((p) => p.idpregio == 17);
      if (zanne) {
        this.zanne = 2;
      }

      //valore in minuti della caccia
      this.duratacaccia = this.user.tempocaccia - this.gregge  - this.metab  + this.zanne ;


      // TEMPO RIDOTTO PER TEST!!!
      this.duratacaccia = 1;
      /***************************** */

      //scrivo in locale il tempo di caccia
      window.localStorage.setItem(
        'NotturnaDurataCaccia',
        this.duratacaccia.toString()
      );
      let tn = new Date();
      this.timestart = tn.getTime();
      window.localStorage.setItem(
        'NotturnaCacciaTimestart',
        this.timestart.toString()
      );


      console.log('inizio caccia: ' + this.timestart);
      console.log('durata caccia: ' + this.duratacaccia);

      this.StartTimer();

    });
  }

  scrivilocale() {
      //scrivo in locale l'ora d'inizio della caccia
      let tn = new Date();
      let ttn = tn.getTime();
      window.localStorage.setItem(
        'NotturnaCacciaTimestart',
        ttn.toString()
      );
  }

  StartTimer() {
    this.timer = setTimeout((x: any) => {
      
      let now = new Date();
      let nowt = now.getTime();

      //secondi trascorsi dall'inizio della caccia
      let elapsedSeconds = Math.round((nowt - this.timestart) / 1000);

      this.minuti = Math.floor( (this.duratacaccia*60 - elapsedSeconds) / 60 );
      this.secondi = (this.duratacaccia*60 - elapsedSeconds) - 60 * Math.floor((this.duratacaccia*60 - elapsedSeconds) / 60);
      if (this.secondi < 10) {
        this.secondi_string = '0' + this.secondi.toString();
      } else {
        this.secondi_string = this.secondi.toString();
      }
      if (this.minuti < 10) {
        this.min_string = '0' + this.minuti.toString();
      } else {
        this.min_string = this.minuti.toString();
      }

      if (elapsedSeconds < this.duratacaccia * 60) {
        if (this.statocaccia == -1) { // cancellata la caccia
          console.log("caccia cancellata");
          this.statocaccia = 0;
          this.user.incaccia = 0;
          window.localStorage.removeItem('NotturnaCacciaTimestart');
          window.localStorage.removeItem('NotturnaDurataCaccia');
        } else {
          //console.log("è passato un secondo, non ho finito, rilancio il timer");
          //console.log ('tempo trascorso: ' + elapsedSeconds + ' secondi');
          this.statocaccia = 1;
          this.user.incaccia = 1;
          this.scrivilocale();
          this.StartTimer();
        }
      } else {
        // HO FINITO LA CACCIA!!!
        this.statocaccia = 2;
        this.user.incaccia = 0;
        console.log("FINE");
        window.localStorage.removeItem('NotturnaCacciaTimestart');
        window.localStorage.removeItem('NotturnaDurataCaccia');
        //this.msgfine();
      }
    }, 1000);
  }


  cancellacaccia() {
    this.statocaccia = -1;
    this.user.incaccia = 0;
  }

  msginizio() {
    var link = 'https://www.roma-by-night.it/ionicPHP/msgtomaster.php';
    var mypost = JSON.stringify({
      idutente: this.user['idutente'],
      messaggio: 'ha iniziato la caccia',
    });

    this.http.post(link, mypost).subscribe();
  }

  msgfine() {

    this.user.incaccia = 0;
    this.statocaccia = 2;

    this.recuperati = this.user['maxps'] - this.user['PScorrenti'];

    this.user['PScorrenti'] = this.user['maxps'];

    var link = 'https://www.roma-by-night.it/ionicPHP/msgtomaster.php';
    var mypost = JSON.stringify({
      idutente: this.user['idutente'],
      messaggio: 'ha terminato la caccia',
    });

    this.http.post(link, mypost).subscribe((res) => {
      var link =
        'https://www.roma-by-night.it/ionicPHP/caccia.php?id=' +
        this.user['idutente'] +
        '&recuperati=' +
        this.recuperati +
        '&anim=0' +
        '&BS=' +
        this.bs ;

      this.http.get(link).subscribe((res) => {
        // if ( this.BS != 1) {
        // torno indietro
        // this.navParams.get("parentPage").loadDadi();
        // }
      });
    });
  }


}
