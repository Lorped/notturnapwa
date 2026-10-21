import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Subject } from 'rxjs';

import { User, Userskill } from '../globals';
import { AuthserviceService } from '../services/authservice.service';

import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonList,
  IonLoading,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  LoadingController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { MenopsRoutineService } from '../services/menops-routine.service';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonInput,
    IonInputPasswordToggle,
    IonButton,
    IonLoading,
    IonCheckbox,
    IonText,
    FormsModule,
  ],
})
export class LoginPage implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  username = '';
  userid = 0;

  isDarkMode = false;

  saveme = {
    checked: false,
  };
  registerCredentials = { username: '', password: '' };

  private router = inject(Router);
  private authentication = inject(AuthserviceService);
  public user = inject(User);
  public userskill = inject(Userskill);
  private loadingCtrl = inject(LoadingController);
  private http = inject(HttpClient);
  private menopsRoutine = inject(MenopsRoutineService);

  private messageReceived = new Subject();
  // emette ad ogni notifica push ricevuta in foreground
  message$ = this.messageReceived.asObservable();

  constructor() {
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
    document.documentElement.classList.toggle(
      'ion-palette-dark',
      this.isDarkMode
    );
    document.documentElement.classList.remove('ion-palette-light');
    this.changeDetectorRef.markForCheck();
  }

  public login() {
    // console.log( this.registerCredentials.username );
    // console.log( this.registerCredentials.password );

    this.authentication
      .login(
        this.registerCredentials.username,
        this.registerCredentials.password
      )
      .subscribe(
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

          this.menopsRoutine.riconciliaAlLogin(this.user);

          // fix
          /*
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
        */

          if (this.user.idlds == 21) {
            // this.user.bonusdisc = Number (this.user.bonusdisc) + 1;
            this.user.bonusdisc = this.user.bonusdisc + 1;
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
              console.log('PF calcolato: ', this.user.pf);

              this.user.rp = Math.floor(this.user['attutimento'] / 2);

              /*
            for (let i = 0; i < this.userskill.skill.length; i++) {
              this.userskill.skill[i].livello = Number(this.userskill.skill[i].livello);
            }
            */
              for (const skill of this.userskill.otherskill) {
                // skill.livello = Number(skill.livello);
                if (skill.idskill == 47) {  //schivare
                  this.user.pf += skill.livello;
                }
              }
  
              const rob = this.userskill.discipline.find(
                (xx) => xx.iddisciplina == 12
              ); //robustezza

              if (rob) {
                // rob.livello = Number(rob.livello);
                this.user.pf += rob.livello;
                this.user.rp = Math.floor(
                  (this.user['attutimento'] + rob.livello) / 2
                );

                for (const potere of rob.poteri) {
                  if (potere.idpotere == 70 ) { 
                    // if (rob.focus > 0 ) { this.user.pf += Number(this.user.bonusdisc); }
                    if (rob.focus > 0 ) { this.user.pf += this.user.bonusdisc; }
                    this.user.pf += (5+rob.livello);
                  }
                  if (potere.idpotere == 74 ) { this.user.pf += 5;} //+5 sono nel potere precedente - che è prerequisito. focus contato una sola volta: la prima
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

              this.authentication.taum(this.user.idutente).subscribe((data) => {
                this.userskill.taum = data.taum;
                this.userskill.necro = data.necro;
                this.userskill.rituali = data.rituali;
              });

              // all done
              this.loadingCtrl.dismiss();

              this.pushsetup(); //  Da verificare se possibile semplificare

              //console.log ("user ", this.user);
              //console.log ("userskill ", this.userskill);

              this.router.navigate(['tabs']);
            },
            (error) => {
              this.loadingCtrl.dismiss();
              alert('Error loading data4'); //SKILL
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

  async pushsetup() {
    try {
      if (!(await isSupported())) {
        console.warn('Le notifiche push non sono supportate su questo browser/dispositivo');
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('Permesso per le notifiche push negato dall\'utente');
        return;
      }

      const app = initializeApp(environment.firebase);
      const messaging = getMessaging(app);

      onMessage(messaging, (payload) => {
        //alert('Notifica push ricevuta in foreground: ' + JSON.stringify(payload));
        //console.log('Notifica push ricevuta in foreground', payload);
        this.messageReceived.next(payload);
      });

      const registration = await navigator.serviceWorker.register('firebase-messaging-sw.js', {
        scope: '/firebase-messaging-scope/',
      });

      const token = await getToken(messaging, {
        vapidKey: environment.firebase.vapidKey,
        serviceWorkerRegistration: registration,
      });

      const updateIdUrl = new URL('https://www.roma-by-night.it/ionicPHP/updateid.php');
      updateIdUrl.searchParams.set('userid', String(this.user.idutente));
      updateIdUrl.searchParams.set('id', token);
      updateIdUrl.searchParams.set('pwa', 'pwa');
      await firstValueFrom(this.http.get(updateIdUrl.toString()));
    } catch (error) {
      console.error('Impossibile configurare le notifiche push', error);
    }

    // await this.router.navigate(['tabs']);
  }


  ionViewWillEnter() {
    this.applyAppPalette();
    // console.log('Dark mode is ' + (this.isDarkMode ? 'enabled' : 'disabled'));
  }
}
