import { Component, OnInit } from '@angular/core';
import { User, RubricaItem } from '../globals';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addcontatto',
  templateUrl: './addcontatto.page.html',
  styleUrls: ['./addcontatto.page.scss'],
})
export class AddcontattoPage implements OnInit {

  nuovoContatto= new RubricaItem('',0,0,0, '',0);
    
  constructor(public router: Router, public http: HttpClient, public user: User) { 
  }

  ngOnInit() {
  }

	add () {
		var url = 'https://www.roma-by-night.it/ionicPHP/addrubrica.php';
		var mypost = JSON.stringify({idutente: this.user.userid, contatto: this.nuovoContatto.contatto, cell: this.nuovoContatto.cell, home: this.nuovoContatto.home, email: this.nuovoContatto.email, note: this.nuovoContatto.note });
		

		this.http.post<any>(url, mypost)
    .subscribe(res =>  {    
      this.router.navigate(['/tabs/tab4']);
		});
	}

  ionViewWillEnter () {
    this.nuovoContatto.contatto = '';
    this.nuovoContatto.cell = 0;
    this.nuovoContatto.email = 0;
    this.nuovoContatto.home = 0;
    this.nuovoContatto.note = '';
  }
}
