import { Component, inject } from '@angular/core';
import { User, RubricaItem } from '../globals';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addcontatto',
  templateUrl: './addcontatto.page.html',
  styleUrls: ['./addcontatto.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonBackButton,
    IonRow,
    IonCol,
    IonAvatar,
    IonItem,
    IonInput,
    IonCheckbox,
    IonButton,
    FormsModule,
  ],
})
export class AddcontattoPage {
  nuovoContatto = new RubricaItem();

  public router = inject(Router);
  public user = inject(User);
  public authservice = inject(AuthserviceService);

  add() {
    if (this.nuovoContatto.cell === undefined) this.nuovoContatto.cell = 0;
    if (this.nuovoContatto.home === undefined) this.nuovoContatto.home = 0;

    this.authservice
      .addcontatto(
        this.user.idutente,
        this.nuovoContatto.contatto,
        this.nuovoContatto.cell,
        this.nuovoContatto.home,
        this.nuovoContatto.note
      )
      .subscribe(() => {
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
