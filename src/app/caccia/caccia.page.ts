import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User, Userskill } from '../globals';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-caccia',
  templateUrl: './caccia.page.html',
  styleUrls: ['./caccia.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class CacciaPage implements OnInit {
  maxTime: any = 600; /* 10 minuti */
  minuti: any = 10;
  secondi: any = '00';
  hidevalue = false;
  timer: any;

  gregge = 0;
  tossico = 0; //difetto
  toxic = 0; //se difetto è stato attivato
  metab = 0;

  recuperati = 0;
  addcaccia = 0;
  BS = 0;
  timestart = 0;
  fullTime = 0;

  constructor(
    private http: HttpClient,
    public user: User,
    public userskill: Userskill,
    public router: Router,
    public activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.user.incaccia != 1) {
      this.user.incaccia = 1;

      // console.log ("again..");

      this.activatedroute.paramMap.subscribe((paramMap) => {
        this.BS = Number(paramMap.get('id'));
        // console.log(paramMap);
      });

      this.gregge = 0;
      this.tossico = 0;
      this.metab = 0;

      for (let i = 0; i < this.userskill.skill.length; i++) {
        if (this.userskill.skill[i].nomeskill == 'Gregge') {
          if (this.userskill.skill[i].livello > 0) {
            this.gregge = this.userskill.skill[i].livello;
          }
        }
        if (this.userskill.skill[i].nomeskill == 'Tossicodipendente') {
          this.tossico = 1;
        }
        if (this.userskill.skill[i].nomeskill == 'Metabolismo Efficiente') {
          this.metab = 1;
        }
      }

      this.maxTime = this.user.tempocaccia * 60 - this.gregge * 60  ;

      if (this.user['idclan'] == 2) {
        //ventrue
        this.maxTime = this.maxTime + 60 * 3; // 3 min. addizionali
      }

      if (this.metab == 1) {
        this.maxTime = 1 * this.maxTime - 3 * 60;
      }

      if (this.BS == 1) {
        this.maxTime = this.maxTime / 2;
      }

      //this.recuperati = 5 ;

      this.fullTime = this.maxTime;

      this.minuti = this.maxTime / 60;
      this.secondi = this.maxTime - 60 * Math.floor(this.maxTime / 60);

      if (this.minuti < 10) {
        this.minuti = '0' + this.minuti;
      }
      if (this.secondi < 10) {
        this.secondi = '0' + this.secondi;
      }

      this.recuperati =
        this.user['maxps'] - this.user['PScorrenti'];

      if (this.tossico == 1 && Math.random() * 100 < 30) {
        this.recuperati = Math.ceil(this.recuperati / 2);
        this.toxic = 1;
      } else {
        this.toxic = 0;
      }
      /* valori ridotti per test
      this.maxTime = 10
      this.minuti = '00';
      this.secondi = '10';
      */
      let tn = new Date();

      this.timestart = tn.getTime();
      this.msginizio();
      this.StartTimer();
    }
  }

  StartTimer() {
    this.timer = setTimeout((x: any) => {
      // if (this.maxTime <= 0) { }
      this.maxTime -= 1;

      let now = new Date();
      let nowt = now.getTime();

      if (
        Math.round((nowt - this.timestart) / 1000) >
        this.fullTime - this.maxTime
      ) {
        // console.log ( "nowt "+ nowt);
        // console.log ( "timestart "+ this.timestart);
        // console.log ( "fullTime "+ this.fullTime);
        // console.log ( "maxTime "+ this.maxTime);
        // console.log ( "diff1 "+ Math.round ((nowt - this.timestart)/1000));
        // console.log ( "diff2 "+ (this.fullTime-this.maxTime) );

        this.maxTime =
          this.fullTime - Math.round((nowt - this.timestart) / 1000);
      }

      this.minuti = Math.floor(this.maxTime / 60);
      this.secondi = this.maxTime - 60 * Math.floor(this.maxTime / 60);
      if (this.secondi < 10) {
        this.secondi = '0' + this.secondi;
      }
      if (this.minuti < 10) {
        this.minuti = '0' + this.minuti;
      }

      if (this.maxTime > 0) {
        this.hidevalue = false;
        this.StartTimer();
      } else {
        this.hidevalue = true;

        //console.log("FINE");

        this.msgfine();
        // if ( this.BS != 1) {
        // verifica del PS
        // this.navParams.get("parentPage").loadDadi();
        // this.navParams.get("parentPage").loadpscorrenti();
        // }
      }
    }, 1000);
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
    this.user['PScorrenti'] =
      this.user['PScorrenti'] + this.recuperati;
    this.user.incaccia = 0;

    if (this.user['PScorrenti'] > this.user['maxps']) {
      this.user['PScorrenti'] = this.user['maxps'];
    }


    //console.log(this.myuser);

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
        this.BS +
        '&toxic=' +
        this.toxic;

      this.http.get(link).subscribe((res) => {
        // if ( this.BS != 1) {
        // torno indietro
        // this.navParams.get("parentPage").loadDadi();
        // }
      });
    });
  }

  goback() {
    this.user.incaccia = 0;

    // if ( this.BS != 1) {
    // this.navParams.get("parentPage").loadDadi();
    // }
    this.router.navigate(['/tabs/tab5']);
  }
}
