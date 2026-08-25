import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User , Userskill} from '../globals';
import { AuthserviceService } from '../services/authservice.service';

import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import {
  FirebaseMessaging,
  GetTokenOptions,
} from "@capacitor-firebase/messaging";
import { Capacitor } from "@capacitor/core";
import { IonicModule } from "@ionic/angular";
import { environment } from "src/environments/environment";

import { CapacitorConfig } from '@capacitor/cli';
import { FCM } from "@capacitor-community/fcm";

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


export class Clan {
  idclan = 0;
  nomeclan = '';
}

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LoginPage implements OnInit {

  username = '' ;
	userid = 0 ;

  listaclan: Array<Clan> = [];

  isDarkMode = false;

	saveme= {
		checked: false
	};
  registerCredentials = { username: '' , password: '' };

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private authentication: AuthserviceService , 
    private user: User,
    public userskill: Userskill, 
    private loadingCtrl: LoadingController) { 

      this.registerCredentials.username = window.localStorage.getItem( "notturnauserid" ) ! ;
      this.registerCredentials.password = window.localStorage.getItem( "notturnapasswd" ) ! ;
	    if (this.registerCredentials.username != '' )  { this.saveme.checked = true; }

  }

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (window.localStorage.getItem('notturnadarkmode') == 'true') {
      document.documentElement.classList.add('ion-palette-dark');
    }

    this.isDarkMode = document.documentElement.classList.contains('ion-palette-dark') || prefersDark.matches;
    prefersDark.addEventListener('change', (mediaQuery) => {
      this.isDarkMode = document.documentElement.classList.contains('ion-palette-dark') || mediaQuery.matches;
    });

  }

  public login() {

    // console.log( this.registerCredentials.username );
    // console.log( this.registerCredentials.password );

    this.authentication.login(this.registerCredentials.username, this.registerCredentials.password)
    .subscribe(
      data => {

        //save if required
        if ( this.saveme.checked == true ) {
          window.localStorage.setItem( "notturnauserid" , this.registerCredentials.username );
          window.localStorage.setItem( "notturnapasswd" , this.registerCredentials.password );
        } else {
          window.localStorage.removeItem( "notturnauserid" );
          window.localStorage.removeItem( "notturnapasswd" );
        }

        //this.user = data;
        Object.assign(this.user, data);


               // fix

        this.user['PScorrenti'] = Number(this.user['PScorrenti']);
        this.user['forza'] = Number(this.user['forza']);
        this.user['destrezza'] = Number(this.user['destrezza']);
        this.user['attutimento'] = Number(this.user['attutimento']);
        this.user['carisma'] = Number(this.user['carisma']);
        this.user['persuasione'] = Number(this.user['persuasione']);
        this.user['saggezza'] = Number(this.user['saggezza']);
        this.user['prontezza'] = Number(this.user['prontezza']);
        this.user['intelligenza'] = Number(this.user['intelligenza']);
        this.user['percezione'] = Number(this.user['percezione']);

        this.user['fdv'] = Number(this.user['fdv']);
        this.user['fdvmax'] = Number(this.user['fdvmax']);
        this.user['fama1'] = Number(this.user['fama1']);
        this.user['fama2'] = Number(this.user['fama2']);
        this.user['fama3'] = Number(this.user['fama3']);

        this.user['xp'] = Number(this.user['xp']);
        this.user['contanti'] = Number(this.user['contanti']);
            
        this.user['PScorrenti'] = Number(this.user['PScorrenti']);
        this.user['maxps'] = Number(this.user['maxps']);

        this.user['bonusrigen'] = Number(this.user['bonusrigen']);
        this.user['rigen'] = Number(this.user['rigen']);

        if (this.user.idlds == 21 ) {
          this.user.bonusdisc = Number (this.user.bonusdisc) + 1;
        }

      this.authentication.skill(this.user.idutente).subscribe(
          (data) => {
            this.userskill.skill = data.skill;
            this.userskill.otherskill = data.otherskill;
            this.userskill.discipline = data.discipline;
            this.userskill.background = data.background;
            this.userskill.alleati = data.alleati;
            this.userskill.contatti = data.contatti;

            this.user.pf = (3 + this.user['attutimento']) * 2;

            this.user.rp = Math.floor(this.user['attutimento'] / 2 );


            for (let i = 0; i < this.userskill.skill.length; i++) {
              this.userskill.skill[i].livello = Number(this.userskill.skill[i].livello);
            }
            for (let i = 0; i < this.userskill.otherskill.length; i++) {
              this.userskill.otherskill[i].livello = Number(this.userskill.otherskill[i].livello);  
              if (this.userskill.otherskill[i].idskill == 47) {  //schivare
                this.user.pf += this.userskill.otherskill[i].livello;
              }
            }

            const rob = this.userskill.discipline.find ( xx => xx.iddisciplina == 12 ); //robustezza

            if ( rob ) {
              this.user.pf += rob.livello;
              this.user.rp = Math.floor( (this.user['attutimento'] + rob.livello) / 2 );

              for ( let j= 0 ; j < rob.poteri.length ; j++) {
                if (rob.poteri[j].idpotere == 70 ) { this.user.pf += (5+rob.livello);}
                if (rob.poteri[j].idpotere == 74 ) { this.user.pf += 5;}
              }
            }                

            this.user['rd'] = Math.floor(
              (this.user['carisma'] +
                this.user['intelligenza'] +
                this.user['prontezza'] +
                this.user['percezione'] +
                this.user['fdv']) /
                5
            );

            this.authentication.taum(this.user.idutente).subscribe(
              (data) => {
                this.userskill.taum = data[0].taum;
                this.userskill.necro = data[0].necro;
                this.userskill.rituali = data[0].rituali;
            });


            // all done
            this.loadingCtrl.dismiss();


            this.pushsetup();

             //console.log ("user ", this.user);
            //console.log ("userskill ", this.userskill);

            //this.router.navigate(['tabs']);

        },
          (error) => {
            this.loadingCtrl.dismiss();
            alert('Error loading data4');  //SKILL
            console.log('error', error);
          }
        );
    },
        (error) => {
          this.loadingCtrl.dismiss();
          //console.log(error);
          switch (error['status']) {
            case 401:
              alert('Non autorizzato');
              break;
            case 404:
              alert('Scheda non trovata');
              break;
            default:
              alert('Server error');
          }
          // console.log('error');
        }
      );
  }





  pushsetup() {
    // Request permission to use push notifications

    FirebaseMessaging.addListener("notificationReceived", (event) => {
      console.log("notificationReceived: ", { event });
    });
    FirebaseMessaging.addListener("notificationActionPerformed", (event) => {
      console.log("notificationActionPerformed: ", { event });
    });
    if (Capacitor.getPlatform() === "web") {
      navigator.serviceWorker.addEventListener("message", (event: any) => {
        console.log("serviceWorker message: ", { event });
        const notification = new Notification(event.data.notification.title, {
          body: event.data.notification.body,
        });
        notification.onclick = (event) => {
          console.log("notification clicked: ", { event });
        };
      });
    }
    
    FirebaseMessaging.requestPermissions().then( result => {
      if (result.receive === 'granted') { 

        // console.log("granted");

        this.getToken().then( (token: any) => {

          // console.log(token);

          let updateurl = 'https://www.roma-by-night.it/ionicPHP/updateid.php?userid='+ this.user.idutente+'&id='+token;
          this.http.get(updateurl)
          .subscribe(res =>  {
              // updated
              //alert('Device registered '+token);
          });

        }, error => {
          console.log("error getting token: ", error);
        });

      } else {
          // OK 
      }
    });


    

    this.router.navigate(['tabs']);

  }



  public async getToken(): Promise<any> {

    // console.log(environment.firebase);
    const options: GetTokenOptions = {
      vapidKey: environment.firebase.vapidKey,
    };
    if (Capacitor.getPlatform() === "web") {
      options.serviceWorkerRegistration =
        await navigator.serviceWorker.register("firebase-messaging-sw.js");
    }
    const { token } = await FirebaseMessaging.getToken(options);
    // console.log ("token ", token);
    return token;
  }



	

}
