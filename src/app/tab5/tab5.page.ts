import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { User, Userskill } from '../globals';
import { FeedService, FeedItem } from '../services/feed.service';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class Tab5Page implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;


  alertButtons = ['OK'];
  tiridado: Array<FeedItem>;

  isResist1Open = false;
  isResist2Open = false;
  esito = 0;


  messaggioArbitro = '';
  isModalOpen = false;
  isToastOpen = false;

  messaggioToast = '';
  

  constructor(
    public user: User,
    public userskill: Userskill,
    public feed: FeedService,
    public router: Router,
    public authservice: AuthserviceService
  ) {
    this.tiridado = [];
    this.loadDadi();
  }

  ngOnInit() { }

  handleRefresh() {
    setTimeout(() => {
      this.loadDadi();     
    }, 2000);
  }

  loadDadi() {
    this.feed.getDadi(this.user['idutente']).subscribe((res: FeedItem[] | null) => {
      this.tiridado = res ?? [];
    });
  }

  tiraildado() {
    this.authservice.lanciadado(this.user['idutente']).subscribe(() => {
      setTimeout(() => this.loadDadi(), 1000);
    });
  }

  usafdv() {
    this.authservice.usofdv(this.user['idutente']).subscribe(() => {
      setTimeout(() => this.loadDadi(), 1000);
    });

    this.user['fdv']--;
    this.user['rd'] = Math.floor(
      (this.user['carisma'] +
        this.user['intelligenza'] +
        this.user['prontezza'] +
        this.user['percezione'] +
        this.user['fdv']) /
        5
    );
  }

  menops() {
    this.authservice.menops(this.user['idutente']).subscribe(() => {
      this.user.PScorrenti--;
      this.checkToast();

      setTimeout(() => this.loadDadi(), 1000);
    });
  }


  resistidisc(){
    const base = Number(this.user['fdv']) + Number(this.user['attivazione']);
    const dad = Math.floor(Math.random() * 5) + 1;    // da 0 a 5 

    this.esito = base * dad ;
    this.isResist1Open = true;

    this.authservice.msgtomaster(this.user['idutente'], 'Tiro di resistenza a Disciplina: ' + this.esito ).subscribe(() => {
      setTimeout(() => this.loadDadi(), 1000);
    });
  }

  resistidisc2(){
    const base = Number(this.user['fdv']) + Number(this.user['attivazione'])+Number(this.user['rd']);
    const dad = Math.floor(Math.random() * 5) + 1;    // da 0 a 5 

    this.esito = base * dad ;
    this.isResist2Open = true;

    this.authservice.msgtomaster(this.user['idutente'], 'Tiro di resistenza a Dominazione: ' + this.esito ).subscribe(() => {
      setTimeout(() => this.loadDadi(), 1000);
    });
  }

  togglealert(isOpen: boolean) {
    this.isResist1Open = isOpen;
    this.isResist2Open = isOpen;
  }
 

  godisciplina(disc: number, nomed: string) {
    if (disc == 98) {
      // go TAUM
      this.router.navigate(['/tabs/taum']);
    } else if (disc == 99) {
      // go NECRO
      this.router.navigate(['/tabs/necro']);
    } else {
      // go GENERICO
      this.router.navigate(['/tabs/poteri', disc, nomed]);
    }
  }


  mandaArbitro() {
    this.setOpen(false);

    // console.log('Arbitro in Nero');
    // console.log('Messaggio da inviare: ', this.messaggioArbitro);
    this.messaggioArbitro = this.messaggioArbitro.trim(); // Rimuove spazi bianchi iniziali e finali

    this.messaggioArbitro = "Richiesta di intervento da parte di un Arbitro in Nero. " + this.messaggioArbitro;

    this.authservice.msgtomaster(this.user.idutente, this.messaggioArbitro).subscribe(() => {
      // console.log('Messaggio inviato con successo');
      this.messaggioArbitro = ''; // Pulisce il campo di input dopo l'invio
      this.setOpen(false); // Chiude il modal dopo l'invio
    });
  }

  ionViewWillEnter() {
    this.tiridado = [];
    this.loadDadi();
    this.checkToast();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  checkToast() {
    this.isToastOpen = false;
    if (this.user.PScorrenti <= this.user.frenesia) {
        //console.log('a rischio frenesia');
        this.messaggioToast = 'Attenzione! Sei a rischio frenesia!!';
        this.setToastOpen(true);
    } else if (this.user.PScorrenti <= this.user.cacciaobbligata) {
        //console.log('in caccia obbligata');
        this.messaggioToast = 'Attenzione! Devi andare a Caccia al più presto!!';
        this.setToastOpen(true);
    } 
  }

}
