import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RubricaItem, ToChange } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changecontatto',
  templateUrl: './changecontatto.page.html',
  styleUrls: ['./changecontatto.page.scss'],
})
export class ChangecontattoPage implements OnInit {
	cell = {
		checked: true
	};
	
	email = {
		checked: true
	};
	
	home = {
		checked: true
	};

	ngOnInit() {
	}
  
	constructor( public http: HttpClient, public tochange: ToChange, public router: Router) {
  	}
  
	change(){
		this.tochange.cell = 1;
		this.tochange.email = 1;
		this.tochange.home = 1;
		if (this.cell.checked==false) {this.tochange.cell=0;}
		if (this.email.checked==false) {this.tochange.email=0;}
		if (this.home.checked==false) {this.tochange.home=0;}

		var url = 'https://www.roma-by-night.it/ionicPHP/changerubrica.php';
		
		// console.log(this.tochange);
	
		var mypost = JSON.stringify({idrubrica: this.tochange.idrubrica, contatto: this.tochange.contatto, cell: this.tochange.cell, email: this.tochange.email,  home: this.tochange.home, note: this.tochange.note });
	
		this.http.post(url, mypost )
    	.subscribe(res =>  {   
			this.router.navigate(['/tabs/tab4']); 
		});
	};

	ionViewWillEnter(){
		if (this.tochange.cell==0) {this.cell.checked=false;}
		if (this.tochange.email==0) {this.email.checked=false;}
		if (this.tochange.home==0) {this.home.checked=false;}
		//console.log("in change2: ", this.tochange);
	}

}
