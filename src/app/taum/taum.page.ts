import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User, Userskill } from '../globals';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-taum',
  templateUrl: './taum.page.html',
  styleUrls: ['./taum.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class TaumPage implements OnInit {
  FurtoVitae = 0;

  constructor(
    public user: User,
    public userskill: Userskill,
    public http: HttpClient,
    public router: Router,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    let tt = new Date(this.user['lastps']);
    let tn = new Date();

    let diff = tn.getTime() - tt.getTime();

    if (diff / (60 * 1000) > 60) {
      this.FurtoVitae = 1;
    }

    //console.log(this.user.taum);
  }

  gotaum(livellopot: number, pot: string, pot2: string) {
    //console.log(pot2);
    //console.log(livellopot);

    var url = 'https://www.roma-by-night.it/ionicPHP/usopotere.php';
    var mypost = JSON.stringify({
      idutente: this.user.idutente,
      potere: pot,
      livello: livellopot,
      aTAUMNECRO: pot2,
    });
    this.http.post<any>(url, mypost).subscribe((res) => {
      //console.log(res);
      let ps = res.ps;
      //console.log(ps);


      this.user['PScorrenti'] = this.user['PScorrenti'] - ps;

      this.showalert(pot2, pot);

      if (this.user['PScorrenti'] == 0) {
        // VAI VIA
        this.router.navigate(['/tabs/tab5']);
      }
    });
  }

  gofurto() {
    this.FurtoVitae = 0;

    var link =
      'https://www.roma-by-night.it/ionicPHP/caccia.php?id=' +
      this.user['idutente'] +
      '&recuperati=3&vitae=1';

    this.http.get(link).subscribe(
      (res: any) => {
        this.user['PScorrenti'] = this.user['PScorrenti'] + 3;
        if (this.user['PScorrenti'] > this.user['maxps']) {
          this.user['PScorrenti'] = this.user['maxps'];
        }

        this.user['lastps'] = res.lastps;

        this.FurtoVitae = 0;

        this.showalert('Patto della Vitae', 'Rigenerazione della Vitae');

        this.router.navigate(['/tabs/tab5']);
      },
      (err) => {
        this.FurtoVitae = 1;
      }
    );
  }

  async showalert(pot2: string, pot: string) {
    let alert = await this.alertCtrl.create({
      header: 'Uso ' + pot2,
      subHeader: pot,
      buttons: ['OK'],
    });
    alert.present();
  }
}
