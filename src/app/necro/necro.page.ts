import { Component, OnInit } from '@angular/core';
import { User } from '../globals';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-necro',
  templateUrl: './necro.page.html',
  styleUrls: ['./necro.page.scss'],
})
export class NecroPage implements OnInit {

  constructor(public user: User, public router: Router, public alertCtrl: AlertController, public http: HttpClient) { }

  ngOnInit() {
  }


  gonecro(livellopot: number, pot: string, pot2: string) {
    //console.log(pot2);
    //console.log(livellopot);


    var url = 'https://www.roma-by-night.it/ionicPHP/usopotere.php';
  	var mypost = JSON.stringify({idutente: this.user.userid , potere: pot, livello: livellopot, aTAUMNECRO: pot2});
    this.http.post<any>(url, mypost)
    .subscribe( (res: any) =>  {

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

  async showalert(pot2: string, pot: string){
    let alert =  await this.alertCtrl.create({
      header: 'Uso '+ pot2,
      subHeader: pot,
      buttons: ['OK']
    });
    alert.present();
  }


}
