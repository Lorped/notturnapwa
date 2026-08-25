import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { User, Oggetto } from '../globals';
import { HttpClient } from '@angular/common/http';
import { AuthserviceService } from '../services/authservice.service';

@Component({
    selector: 'app-oggetto',
    templateUrl: './oggetto.page.html',
    styleUrls: ['./oggetto.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class OggettoPage implements OnInit {


  // isModalOpen = false;
  // oggetto: Oggetto = new Oggetto();

  giarisposto = false;
  rispostaselezionata = '';

  oldscan: Array<Oggetto> = [];




  constructor(public user: User , private authservice: AuthserviceService, private http: HttpClient, public oggetto: Oggetto, private router: Router) {	}
  
  ionViewWillEnter(){  
    if ( this.oggetto.id.length > 12 ) {
      let newbarcode = this.oggetto.id.substr(-12);
      this.oggetto.id = newbarcode;
    }

    this.authservice.barcode(this.user.idutente, this.oggetto.id).subscribe((data) => {

      // this.isModalOpen = true;
      
      // console.log(data);

      this.oggetto.nomeoggetto = data.nomeoggetto;
      this.oggetto.descrizione = data.descrizione;
      this.oggetto.esito = data.esito;
      this.oggetto.domanda = data.domanda;
      this.oggetto.R1 = data.R1;
      this.oggetto.R2 = data.R2;
      this.oggetto.esitoSI = data.esitoSI;
      this.oggetto.esitoNO = data.esitoNO;  

      this.giarisposto = false;
      this.rispostaselezionata = '';

		});
  }

  risposta(risposta: string) {
    //console.log('Risposta selezionata:', risposta);
    this.giarisposto = true;
    this.rispostaselezionata = risposta;
  }


  cancel() {
    this.router.navigate(['/tabs/tab3']);
  }


  ngOnInit() {
  }

}
