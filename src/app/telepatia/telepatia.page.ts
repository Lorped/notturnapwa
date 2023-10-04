import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Utente } from '../globals';
import { Router } from '@angular/router';


@Component({
  selector: 'app-telepatia',
  templateUrl: './telepatia.page.html',
  styleUrls: ['./telepatia.page.scss'],
})
export class TelepatiaPage implements OnInit {

  listautenti: Array<Utente> = [];

  pgscelto: number = 0;
  selected: string = '';
  messaggio = '';

  constructor(private http: HttpClient, private user: User, private router: Router) { }

  ngOnInit() {
    
    //console.log(this.myuser);
    this.loadUtenti(this.user.userid);
  }


  loadUtenti(a: number) {
		var url = 'https://www.roma-by-night.it/ionicPHP/utenti.php?excl='+a;
    
    this.listautenti = [];

		this.http.get<any>(url)
    .subscribe( (res:any) => {
      if (res != null) {
        for (let i = 0; i < res.length; i++) {
					let item = res[i];
					let newutente = new Utente(item.nomepg, item.idutente);
					this.listautenti.push(newutente);
				}
			}
      // console.log(this.listautenti);
    });

	}

  invia () {
		var url = 'https://www.roma-by-night.it/ionicPHP/inviamessaggioutente.php';
		var mypost = JSON.stringify({idutente: this.user.userid , destinatario: this.pgscelto, messaggio: this.messaggio });

		let headers = new Headers();

		headers.append('Content-Type', 'application/json');

		this.http.post(url, mypost)
		.subscribe(res =>  {
        //this.navParams.get("parentPage").loadDadi();
				this.user.fulldata['psvuoti'] = 1*this.user.fulldata['psvuoti']+1;
				this.user.fulldata['PScorrenti'] = 1*this.user.fulldata['PScorrenti']-1;
				this.router.navigate(['/tabs/poteri',3, "Auspex"]);
        
		});

		//console.log(mypost);
	}


}
