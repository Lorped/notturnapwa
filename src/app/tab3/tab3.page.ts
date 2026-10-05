import {
  ChangeDetectorRef,
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { User, Oggetto } from '../globals';
import { AuthserviceService } from '../services/authservice.service';
import { IonicModule } from '@ionic/angular';
import { MenopsRoutineService } from '../services/menops-routine.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule],
})
export class Tab3Page implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  giarisposto = false;
  rispostaselezionata = '';

  oldscan: Array<Oggetto> = [];

  public user = inject(User);
  private authservice = inject(AuthserviceService);
  private router = inject(Router);
  private menopsRoutine = inject(MenopsRoutineService);

  ngOnInit() {
    this.menopsRoutine.ripristina(this.user);
  }

  async openbarcode() {
    await this.router.navigate(['/qrscanner']);
  }

  risposta(risposta: string) {
    //console.log('Risposta selezionata:', risposta);
    this.giarisposto = true;
    this.rispostaselezionata = risposta;
  }

  /** NO MODAL IN PWA 
  cancel() {
    this.isModalOpen = false;
    this.authservice.getscan(this.user.idutente).subscribe((data) => {
      this.oldscan = data;
    });
  }
   ********** */

  ionViewWillEnter() {
    this.authservice.getscan(this.user.idutente).subscribe((data) => {
      //console.log(data);
      this.oldscan = data;
      this.changeDetectorRef.markForCheck();
      // console.log("odscan : ", this.oldscan);
    });
  }
}
