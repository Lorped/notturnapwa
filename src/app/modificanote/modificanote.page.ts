import { Component, OnInit } from '@angular/core';
import { User } from '../globals';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificanote',
  templateUrl: './modificanote.page.html',
  styleUrls: ['./modificanote.page.scss'],
})
export class ModificanotePage implements OnInit {

  constructor(public user: User, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  modifica(){
    var url = 'https://www.roma-by-night.it/ionicPHP/modificanote.php';
		var mypost = JSON.stringify({idutente: this.user.userid, note: this.user.fulldata.note });
		
		
		this.http.post(url, mypost)
    		.subscribe(res =>  {    
          //console.log("here");
          this.router.navigate(['/tabs/tab3']);

		  });
  }

}
