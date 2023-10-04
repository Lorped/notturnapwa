import { Component, OnInit } from '@angular/core';
import { User } from '../globals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addpx',
  templateUrl: './addpx.page.html',
  styleUrls: ['./addpx.page.scss'],
})
export class AddpxPage implements OnInit {

  newpx: number = 0;

  constructor(public user: User, public http: HttpClient) { }

  ngOnInit() {
  }

  addpx(){
    var url = 'https://www.roma-by-night.it/ionicPHP/addpx.php?id='+this.user.userid+"&px="+this.newpx;
		
		// console.log(this.tochange);
	
		this.http.get(url )
    	.subscribe(res =>  {
        
        var link = 'https://www.roma-by-night.it/ionicPHP/msgtomaster.php';
        var messaggio =" ha aggiunto "+this.newpx+" px";
        var mypost = JSON.stringify({idutente: this.user.userid , messaggio: messaggio});

        // console.log(messaggio);
        this.http.post(link, mypost).subscribe();

        
        this.user.fulldata.xp += this.newpx;
        this.newpx = 0;
			// this.router.navigate(['/tabs/tab4']); 
		});
  }
}
