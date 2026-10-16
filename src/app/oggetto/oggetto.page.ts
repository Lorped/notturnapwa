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

  rispcorretta = 0;
  rispostaenigma = ''; // Risposta utente all'enigma
  numrisposte = 0; // Numero di risposte inviate all'enigma


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

        this.numrisposte = 0; // Reset the number of attempts for the new scan
        this.rispcorretta = 0; // Reset the correctness of the enigma response for the new scan
        this.rispostaenigma = ''; // Reset the enigma response for the new scan

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

  async RispostaEnigma() {
    // Logica per gestire la risposta all'enigma
    console.log('Risposta all\'enigma:', this.rispostaenigma);
    if ( this.rispostaenigma.trim().toUpperCase() === this.oggetto.soluzione.trim().toUpperCase()) {
      await this.authservice.writeenigma(this.user.idutente, this.oggetto.idoggetto).subscribe();
      this.rispcorretta = 1; // Risposta corretta sblocco enigma su frontend
      this.authservice.msgtomaster(this.user.idutente,'Risolto enigma ' + this.oggetto.nomeoggetto).subscribe();

    } else {
      this.rispcorretta = 0; // Risposta errata
      this.numrisposte++;
      if (this.numrisposte >= 10) {
        //this.rispcorretta = -1; // Blocco dopo 10 tentativi
        this.authservice.msgtomaster(this.user.idutente,'Tentativi esauriti per enigma ' + this.oggetto.nomeoggetto).subscribe();
        this.cancel();
      }
    }
  }
}
