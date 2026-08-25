import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';
import { User , Userskill } from '../globals';
import { AuthserviceService } from '../services/authservice.service';

export interface datips {
  PScorrenti: number;
}

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class Tab1Page {
  constructor( 
    public user: User , 
    public userskill: Userskill,
    private authentication: AuthserviceService,
    private router: Router
  ) {  }

  ngOnInit() {
    // console.log ("user - " , this.user);
  }
  ionViewWillEnter() {
    // console.log ("2 user - " , this.user);
  } 

  
  public logoutx() {
    this.router.navigate(['login']);
  }

  doRefresh(event: RefresherCustomEvent) {    
    setTimeout(() => {
      this.authentication.loadpscorrenti(this.user.idutente).subscribe((data: datips) => {
          this.user.PScorrenti = data.PScorrenti;
        });
      event.target.complete();
    }, 2000);
  }

}
