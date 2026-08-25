import { Component,  ChangeDetectionStrategy } from '@angular/core';
import { User, RubricaItem } from '../globals';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-addcontatto',
  templateUrl: './addcontatto.page.html',
  styleUrls: ['./addcontatto.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AddcontattoPage  {
  nuovoContatto = new RubricaItem();

  constructor(
    public router: Router,
    public user: User,
    public authservice: AuthserviceService 
  ) {}



  add() {
    if (this.nuovoContatto.cell === undefined) this.nuovoContatto.cell = 0;
    if (this.nuovoContatto.home === undefined) this.nuovoContatto.home = 0;

    this.authservice.addcontatto(
      this.user.idutente,
      this.nuovoContatto.contatto,
      this.nuovoContatto.cell,
      this.nuovoContatto.home,
      this.nuovoContatto.note
    ).subscribe(() => {
      this.router.navigate(['/tabs/rubrica']);
    });
  }

  ionViewWillEnter() {
    this.nuovoContatto.contatto = '';
    this.nuovoContatto.cell = 0;
    this.nuovoContatto.home = 0;
    this.nuovoContatto.note = '';
  }
}
