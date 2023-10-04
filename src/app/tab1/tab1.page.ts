import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../globals';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public user: User , private router: Router, private authentication: AuthserviceService) {
  }



  public logoutx() {
		this.router.navigate(['login']);
	}

  doRefresh(event: any) {
    setTimeout(() => {
      
      this.authentication.loadpscorrenti(this.user.userid)
      .subscribe(
        (data:any) => {
          this.user.fulldata.PScorrenti=data.PScorrenti
          this.user.fulldata.psvuoti=data.psvuoti
        }
      )

      event.target.complete();
    }, 2000);
  }




}
