import { Component, OnInit } from '@angular/core';
import { User } from '../globals';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-morte',
  templateUrl: './morte.page.html',
  styleUrls: ['./morte.page.scss'],
})
export class MortePage implements OnInit {

  constructor(public user: User, public http: HttpClient, public router: Router) { }

  ngOnInit() {
  }
  morte() {


    var link = 'https://www.roma-by-night.it/ionicPHP/morte.php?id='+this.user['userid'];
    this.http.get(link)
    .subscribe( res => {
      this.router.navigate(['/login']);
    }); 


  }
}
