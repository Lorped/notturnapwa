import { Component, OnInit } from '@angular/core';
import { User, Oggetto } from '../globals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-oggetto',
  templateUrl: './oggetto.page.html',
  styleUrls: ['./oggetto.page.scss'],
})
export class OggettoPage implements OnInit {



	nomeoggetto: string = '';
	descrizione: string = '';
  ifdomanda: number  = 0 ;
  esito: number  = 0 ;
  nodoppioesito: number = 0 ;
  esitotext: string = '';
  domanda: string ='';
  r1: string = '';
  r2: string = '';





  constructor(public user: User , public oggetto: Oggetto, private http: HttpClient) { 
  }
  
  ionViewWillEnter(){  
    if ( this.oggetto.id.length > 12 ) {
      let newbarcode = this.oggetto.id.substr(-12);
      this.oggetto.id = newbarcode;
    }

    var url = 'https://www.roma-by-night.it/ionicPHP/barcode.php?id='+this.user.userid+'&barcode='+this.oggetto.id;

    this.http.get<any>(url)
		.subscribe( data => {
      // console.log (data)
			this.nomeoggetto=data[0];
			this.descrizione=data[1];
      this.ifdomanda  = 0 ;
			// console.log(this.descrizione);
      // console.log (data.length);
      if(data.length >2  ) {

        this.esito = 0;
        this.nodoppioesito = 0 ;
        this.ifdomanda = 1;
        this.domanda = data[2].Domanda;
        this.r1 = data[2].R1;
        this.r2 = data[2].R2;
         // console.log (this.domanda);
         // console.log (this.r1);
         // console.log (this.r2);
      }

		});
  }

  rispSI () {

    var msg: string;
    this.esito = 1 ;
    this.esitotext = this.r1;

    msg="Ha risposo SI alla domanda \""+this.domanda+"\" relativa all'oggetto "+this.nomeoggetto;
    if (this.nodoppioesito == 0 ) {
      this.comunicaesito(msg);
      this.nodoppioesito = 1;
    }
  }
  rispNO () {
    var msg: string;

    this.esito = 2 ;
    this.esitotext = this.r2;

    msg="Ha risposo NO alla domanda \""+this.domanda+"\" relativa all'oggetto "+this.nomeoggetto;
    if (this.nodoppioesito == 0 ) {
      this.comunicaesito(msg);
      this.nodoppioesito = 1;
    }
  }

  comunicaesito(messaggio:string){


    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    var link = 'https://www.roma-by-night.it/ionicPHP/msgtomaster.php';
    var mypost = JSON.stringify({idutente: this.user.userid , messaggio: messaggio});

    // console.log(messaggio);
    this.http.post(link, mypost)
    .subscribe();
  }


  ngOnInit() {
  }

}
