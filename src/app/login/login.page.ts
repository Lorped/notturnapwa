import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User , Userskill} from '../globals';
import { AuthserviceService } from '../services/authservice.service';

import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { CapacitorConfig } from '@capacitor/cli';
import { FCM } from '@capacitor-community/fcm';



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
  standalone: false,
})
export class LoginPage implements OnInit {
  username = '';
  userid = 0;

  listaclan: Array<Clan> = [];

  isDarkMode = false;

  saveme = {
    checked: false,
  };
  registerCredentials = { username: '', password: '' };

  constructor(
    private router: Router,
    private authentication: AuthserviceService,
    public user: User,
    public userskill: Userskill,
    private loadingCtrl: LoadingController
  ) {
    this.registerCredentials.username =
      window.localStorage.getItem('notturnauserid')!;
    this.registerCredentials.password =
      window.localStorage.getItem('notturnapasswd')!;
    if (this.registerCredentials.username != '') {
      this.saveme.checked = true;
    }
  }

  ngOnInit() {
    this.applyAppPalette();

  }
  
  private applyAppPalette() {
    let savedDarkMode = window.localStorage.getItem('notturnadarkmode');
    if (savedDarkMode === null) {
      savedDarkMode = 'false';
      window.localStorage.setItem('notturnadarkmode', savedDarkMode);
    }

    this.isDarkMode = savedDarkMode === 'true';
    document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
    document.documentElement.classList.remove('ion-palette-light');
  }

  public login() {
    // console.log( this.registerCredentials.username );
    // console.log( this.registerCredentials.password );

    this.authentication.login(this.registerCredentials.username,this.registerCredentials.password).subscribe(
      (data) => {
        //save if required
        if (this.saveme.checked == true) {
          window.localStorage.setItem(
            'notturnauserid',
            this.registerCredentials.username
          );
          window.localStorage.setItem(
            'notturnapasswd',
            this.registerCredentials.password
          );
        } else {
          window.localStorage.removeItem('notturnauserid');
          window.localStorage.removeItem('notturnapasswd');
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
            console.log("PF calcolato: ", this.user.pf);

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
              rob.livello = Number(rob.livello);
              this.user.pf += rob.livello;
              this.user.rp = Math.floor( (this.user['attutimento'] + rob.livello) / 2 );

              for ( let j= 0 ; j < rob.poteri.length ; j++) {
                if (rob.poteri[j].idpotere == 70 ) { 
                  if (rob.focus > 0 ) { this.user.pf += Number(this.user.bonusdisc); }
                  this.user.pf += (5+rob.livello);
                }
                if (rob.poteri[j].idpotere == 74 ) { this.user.pf += 5;} //+5 sono nel potere precedente - che è prerequisito. focus contato una sola volta: la prima
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

            this.pushsetup();    //  Da verificare se possibile semplificare

            //console.log ("user ", this.user);
            //console.log ("userskill ", this.userskill);

            this.router.navigate(['tabs']);
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

    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.createChannel({
      name: 'Notturna Channel',
      id: 'PushPluginChannel',
      description: 'Notturna Channel',
      importance: 5,
      sound: 'notturna_sound',
    });

    const config: CapacitorConfig = {
      plugins: {
        PushNotifications: {
          presentationOptions: ['badge', 'sound', 'alert'],
        },
      },
    };

    PushNotifications.addListener('registration', (token: Token) => {
      //alert('Push registration success, token: ' + token.value);

      this.authentication.updateid(this.user.idutente, token.value).subscribe(() => {
        // updated
        //alert('Device registered '+token.value);
      });

    });

    PushNotifications.addListener('registrationError', (error) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        //alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification));
      }
    );

    FCM.subscribeTo({ topic: 'user' })
      .then(() => console.log(`subscribed to topic: user `))
      .catch((err) => console.log(err));

    this.authentication.getregistra().subscribe((data) => {
      this.listaclan = data.clan;

      this.listaclan.forEach((element) => {
        if (element.idclan != Number(this.user.idclan)) {
          FCM.unsubscribeFrom({ topic: element.nomeclan });
          //console.log(`unsubscribed from topic: `, element.nomeclan);
        }
      });
    });


    const atopic2 = this.user.nomeclan;
    FCM.subscribeTo({ topic: atopic2 })
      .then(() => console.log(`subscribed to topic: `, atopic2))
      .catch((err) => console.log(err));

    this.router.navigate(['tabs']);
  }


  ionViewWillEnter() {
    this.applyAppPalette();
    // console.log('Dark mode is ' + (this.isDarkMode ? 'enabled' : 'disabled'));
  }
}
