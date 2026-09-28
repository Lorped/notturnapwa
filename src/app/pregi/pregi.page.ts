import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { User, pregiodifetto } from '../globals';
import { AuthserviceService } from '../services/authservice.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pregi',
  templateUrl: './pregi.page.html',
  styleUrls: ['./pregi.page.scss'],
  imports: [IonicModule],
})
export class PregiPage {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public auth = inject(AuthserviceService);
  public user = inject(User);

  listapregi: Array<pregiodifetto> = [];

  ionViewWillEnter() {
    this.auth
      .getpregi(this.user.idutente)
      .subscribe((data: Array<pregiodifetto>) => {
        this.listapregi = Array.isArray(data) ? [...data] : [];
        this.changeDetectorRef.markForCheck();
        //console.log('Pregi e difetti:', this.listapregi);
      });
  }
}
