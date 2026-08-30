import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { Oggetto, User } from '../globals';

@Component({
  selector: 'app-oggetto',
  templateUrl: './oggetto.page.html',
  styleUrls: ['./oggetto.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class OggettoPage {
  giarisposto = false;
  rispostaselezionata = '';

  constructor(
    private user: User,
    private authservice: AuthserviceService,
    public oggetto: Oggetto,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.oggetto.id = this.oggetto.id.slice(-12);
    this.authservice.barcode(this.user.idutente, this.oggetto.id).subscribe((data) => {
      Object.assign(this.oggetto, data);
      this.giarisposto = false;
      this.rispostaselezionata = '';
    });
  }

  risposta(risposta: string) {
    this.giarisposto = true;
    this.rispostaselezionata = risposta;
  }

  cancel() {
    this.router.navigate(['/tabs/tab3']);
  }
}