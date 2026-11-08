import { Component, inject, signal } from '@angular/core';
import { ToChange } from '../globals';
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
  selector: 'app-changecontatto',
  templateUrl: './changecontatto.page.html',
  styleUrls: ['./changecontatto.page.scss'],
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
export class ChangecontattoPage {
  contatto = signal('');
  note = signal('');
  cellChecked = signal(false);
  homeChecked = signal(false);

  public router = inject(Router);
  public authservice = inject(AuthserviceService);
  public tochange = inject(ToChange);

  change() {
    this.authservice
      .changerubrica(
        this.tochange.idrubrica,
        this.contatto(),
        this.cellChecked() ? 1 : 0,
        this.homeChecked() ? 1 : 0,
        this.note()
      )
      .subscribe(() => {
        this.router.navigate(['/tabs/rubrica']);
      });
  }

  ionViewWillEnter() {
    this.contatto.set(this.tochange.contatto);
    this.note.set(this.tochange.note);
    this.cellChecked.set(this.tochange.cell != 0);
    this.homeChecked.set(this.tochange.home != 0);
  }
}
