import { ChangeDetectorRef, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { Oggetto, User } from '../globals';

@Component({
  selector: 'app-oggetto',
  templateUrl: './oggetto.page.html',
  styleUrls: ['./oggetto.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OggettoPage {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
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
      this.changeDetectorRef.markForCheck();
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