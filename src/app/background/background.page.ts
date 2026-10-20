import { Component } from '@angular/core';
import { User, Userskill } from '../globals';
import { inject } from '@angular/core';
import {
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { NgClass } from '@angular/common';
import { TimesPipe } from '../pipes/times.pipe';

@Component({
  selector: 'app-background',
  templateUrl: './background.page.html',
  styleUrls: ['./background.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonRow,
    IonCol,
    NgClass,
    TimesPipe,
  ],
})
export class BackgroundPage {
  public user = inject(User);
  public userskill = inject(Userskill);
  // constructor(public user: User, public userskill: Userskill) {}
}
