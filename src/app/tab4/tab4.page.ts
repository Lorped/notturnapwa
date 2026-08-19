import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User, Userskill, RubricaItem, ToChange } from '../globals';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class Tab4Page implements OnInit {
  rubrica: Array<RubricaItem> = [];

  constructor(
    public tochange: ToChange,
    public router: Router,
    public user: User,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  loadRubrica() {
    var url =
      'https://www.roma-by-night.it/ionicPHP/rubrica.php?id=' +
      this.user.idutente;

    var miarubrica: Array<RubricaItem> = [];

    this.http
      .get<any>(url)
      .pipe(
        map((res: any) => {
          if (res != null) {
            for (let i = 0; i < res.length; i++) {
              let item = res[i];
              let newRubricaItem = new RubricaItem(

              );
              miarubrica.push(newRubricaItem);
            }
          }
          return miarubrica;
        })
      )
      .subscribe((allFeeds: any) => {
        this.rubrica = allFeeds;
      });
  }

  add() {
    this.router.navigate(['/tabs/addcontatto']);
  }

  edit(item: RubricaItem) {
    this.tochange.contatto = item.contatto;
    this.tochange.cell = item.cell;
    this.tochange.home = item.home;

    this.tochange.note = item.note;
    this.tochange.idrubrica = item.idrubrica;
    // console.log ("in edit: ", this.tochange);
    this.router.navigate(['/tabs/changecontatto']);
    //console.log (this.tochange.email);
    //this.navCtrl.push('ChangecontattoPage', { "parentPage": this } );
  }

  delete(item: RubricaItem) {
    //console.log("da cancellare "+item.idrubrica);
    var url =
      'https://www.roma-by-night.it/ionicPHP/delrubrica.php?id=' +
      item.idrubrica;
    this.http.get(url).subscribe((data) => {
      this.loadRubrica();
    });
  }

  ionViewWillEnter() {
    //console.log("here");
    this.loadRubrica();
  }
}
