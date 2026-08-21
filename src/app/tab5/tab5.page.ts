import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User, Userskill } from '../globals';
import { FeedService, FeedItem } from '../services/feed.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class Tab5Page implements OnInit {
  public alertButtons = ['OK'];
  tiridado: Array<FeedItem>;

  constructor(
    public user: User,
    public userskill: Userskill,
    public feed: FeedService,
    public http: HttpClient,
    public router: Router,
    private iab: InAppBrowser,
  ) {
    this.tiridado = [];
    this.loadDadi();
  }

  ngOnInit() {}

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadDadi();
      event.target.complete();
    }, 2000);
  }

  loadDadi(): any {
    this.feed.getDadi(this.user['idutente']).subscribe((allFeeds: any) => {
      this.tiridado = allFeeds;
    });
  }

  tiraildado() {
    var link = 'https://www.roma-by-night.it/ionicPHP/lanciadado.php';
    var mypost = JSON.stringify({ userid: this.user['idutente'] });

    this.http.post<any>(link, mypost).subscribe((res) => {
      setTimeout(this.loadDadi(), 1000);
    });
  }
  usafdv() {
    var link = 'https://www.roma-by-night.it/ionicPHP/usofdv.php';
    var mypost = JSON.stringify({ userid: this.user['idutente'] });

    this.http.post<any>(link, mypost).subscribe((res) => {
      setTimeout(this.loadDadi(), 1000);
    });

    this.user['fdv']--;
    this.user['rd'] = Math.floor(
      (this.user['carisma'] +
        this.user['intelligenza'] +
        this.user['prontezza'] +
        this.user['percezione'] +
        this.user['fdv']) /
        5
    );
  }
  menops() {
    var link =
      'https://www.roma-by-night.it/ionicPHP/menops2.php?id=' +
      this.user['idutente'];

    this.http.get<any>(link).subscribe((res) => {
      this.user.PScorrenti--;

      setTimeout(this.loadDadi(), 1000);
    });
  }

  gocaccia() {
    var id = 0;
    this.router.navigate(['/tabs/caccia', id]);
  }

  golegami() {
    this.router.navigate(['/tabs/legami']);
  }

 

  godisciplina(disc: number, nomed: string) {
    if (disc == 98) {
      // go TAUM
      this.router.navigate(['/tabs/taum']);
    } else if (disc == 99) {
      // go NECRO
      this.router.navigate(['/tabs/necro']);
    } else {
      // go GENERICo
      // console.log("disc ", disc, "nomed ", nomed)
      this.router.navigate(['/tabs/poteri', disc, nomed]);
    }
  }



 


  nl2br(str: string) {
    // Some latest browsers when str is null return and unexpected null value
    if (typeof str === 'undefined' || str === null) {
      return '';
    }
    // Adjust comment to avoid issue on locutus.io display
    var breakTag = '<br>';
    return (str + '').replace(/(\r\n|\n\r|\r|\n)/g, breakTag + '$1');
  }



  openUrl2() {
    const link =
      'https://drive.google.com/file/d/0BwbyMyT-GT-UZFBwNmp4SHZ6SFk/view';
    //const browser = this.iab.create(this.link);
    this.iab.create(link, '_system');
  }

  openUrl3() {
    const link =
      'https://drive.google.com/file/d/1RoDz3IopLmZtTK_7zDms7ClkcBlZdI31/view';
    //const browser = this.iab.create(this.link);
    this.iab.create(link, '_system');
  }



  modifica() {
    // this.navCtrl.push('ModificanotePage', { "parentPage": this });
    this.router.navigate(['/tabs/modificanote']);
  }

  reloadnote() {
    //this.note = this.nl2br(this.user['note']);
    //this.notemaster = this.nl2br(this.user['notemaster']);
  }


  ionViewWillEnter() {
    this.tiridado = [];
    this.loadDadi();
  }
}
