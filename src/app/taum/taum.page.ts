import { Component, OnInit } from '@angular/core';
import { User } from '../globals';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-taum',
  templateUrl: './taum.page.html',
  styleUrls: ['./taum.page.scss'],
})
export class TaumPage implements OnInit {

  FurtoVitae = 0;

  constructor(public user: User, public http: HttpClient, public router: Router, public alertCtrl: AlertController) { }

  ngOnInit() {

    let tt = new Date ( this.user.fulldata['lastvitae'] );
    let tn = new Date ( );

    let diff = tn.getTime() - tt.getTime();

    if ( diff / (60*1000) > 60 ) {
      this.FurtoVitae = 1 ;
    }

    //console.log(this.user.taum);
  }

  gotaum(livellopot: number, pot: string, pot2: string) {
    //console.log(pot2);
    //console.log(livellopot);


    var url = 'https://www.roma-by-night.it/ionicPHP/usopotere.php';
  	var mypost = JSON.stringify({idutente: this.user.userid , potere: pot, livello: livellopot, aTAUMNECRO: pot2});
    this.http.post<any>(url, mypost)
    .subscribe(res =>  {

      //console.log(res);
      let ps=res.ps;
      //console.log(ps);

      this.user.fulldata['psvuoti'] = this.user.fulldata['psvuoti']+ps;
      this.user.fulldata['PScorrenti'] = this.user.fulldata['PScorrenti']-ps;

      this.showalert(pot2, pot);

      if (this.user.fulldata['PScorrenti']==0) {
        // VAI VIA
        this.router.navigate(['/tabs/tab5']);
      }
    });
  
  }

  gofurto () {

    this.FurtoVitae = 0;

    var link = 'https://www.roma-by-night.it/ionicPHP/caccia.php?id=' + this.user['userid']+  '&recuperati=3&vitae=1' ;

    this.http.get(link)
    .subscribe( (res: any) => {
      this.user.fulldata['PScorrenti'] = this.user.fulldata['PScorrenti'] + 3;
      if ( this.user.fulldata['PScorrenti'] > this.user.fulldata['setetot'] ) {
        this.user.fulldata['PScorrenti'] = this.user.fulldata['setetot'] ;
      }
      this.user.fulldata['psvuoti'] = this.user.fulldata['setetot'] - this.user.fulldata['PScorrenti'];

      this.user.fulldata['lastvitae'] = res.lastvitae;
      
      this.FurtoVitae = 0;
    
      this.showalert('Patto della Vitae','Rigenerazione della Vitae');

      this.router.navigate(['/tabs/tab5']);
    }, (err) => {
      this.FurtoVitae = 1;
    });


  }

  async showalert(pot2: string, pot: string){
    let alert =  await this.alertCtrl.create({
      header: 'Uso '+ pot2,
      subHeader: pot,
      buttons: ['OK']
    });
    alert.present();
  }

}
