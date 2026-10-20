import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { User, pregiodifetto } from '../globals';
import { AuthserviceService } from '../services/authservice.service';
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

@Component({
  selector: 'app-pregi',
  templateUrl: './pregi.page.html',
  styleUrls: ['./pregi.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
  ],
})
export class PregiPage {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public auth = inject(AuthserviceService);
  public user = inject(User);

  listapregi: pregiodifetto[] = [];

  ionViewWillEnter() {
    this.auth
      .getpregi(this.user.idutente)
      .subscribe((data: pregiodifetto[]) => {
        this.listapregi = Array.isArray(data) ? [...data] : [];
        this.changeDetectorRef.markForCheck();
        //console.log('Pregi e difetti:', this.listapregi);
      });
  }
}
