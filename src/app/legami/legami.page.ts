import { Component, OnInit } from '@angular/core';
import { Legame, Utente , User  } from '../globals';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legami',
  templateUrl: './legami.page.html',
  styleUrls: ['./legami.page.scss'],
})
export class LegamiPage implements OnInit {

  listalegami: Array<Legame> = [];
  listautenti: Array<Utente> = [];

  pgscelto: number = 0;
  selected: string = '';

  constructor(public http: HttpClient, public user: User, public router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter () {
    this.loadUtenti(this.user.userid);

    var url = 'https://www.roma-by-night.it/ionicPHP/getlegami.php?id='+this.user.userid;
    this.http.get(url)
    .subscribe((res: any) =>  {
        this.listalegami = res.target;
        // console.log (this.listalegami);
    });
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

  invia(){

    var url = 'https://www.roma-by-night.it/ionicPHP/legami.php';
    var mypost = JSON.stringify({target: this.user.userid , domitor: this.pgscelto });

    this.http.post(url, mypost)
    .subscribe(res =>  {
      this.router.navigate(['/tabs/tab5']); 
    });

    //console.log(mypost);
  }


}
