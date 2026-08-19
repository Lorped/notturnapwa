import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User , Userskill } from '../globals';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class Tab1Page implements OnInit{
  constructor(
    public user: User,
    public userskill: Userskill,
    private router: Router,
    private authentication: AuthserviceService
  ) {}

  ngOnInit() {
    //console.log ("user - " , this.user);
  }

  public logoutx() {
    this.router.navigate(['login']);
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.authentication
        .loadpscorrenti(this.user.idutente)
        .subscribe((data: any) => {
          this.user.PScorrenti = data.PScorrenti;
        });

      event.target.complete();
    }, 2000);
  }
}
