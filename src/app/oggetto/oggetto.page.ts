import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { Oggetto, User } from '../globals';
import { IonicModule } from '@ionic/angular';
import { MenopsRoutineService } from '../services/menops-routine.service';

@Component({
  selector: 'app-oggetto',
  templateUrl: './oggetto.page.html',
  styleUrls: ['./oggetto.page.scss'],
  imports: [IonicModule],
})
export class OggettoPage {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  giarisposto = false;
  rispostaselezionata = '';

  public user = inject(User);
  public authservice = inject(AuthserviceService);
  public oggetto = inject(Oggetto);
  private router = inject(Router);
  private menopsRoutine = inject(MenopsRoutineService);

  ionViewWillEnter() {
    this.oggetto.id = this.oggetto.id.slice(-12);
    this.authservice
      .barcode(this.user.idutente, this.oggetto.id)
      .subscribe((data) => {
        Object.assign(this.oggetto, data);
        this.giarisposto = false;
        this.rispostaselezionata = '';
        this.changeDetectorRef.markForCheck();

        if (data.nomeoggetto === 'SEGRETERIA' && this.user.idlds === 17) {
          this.menopsRoutine.avvia(this.user);
        }
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
