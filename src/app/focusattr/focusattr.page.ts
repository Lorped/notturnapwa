import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { User } from '../globals';
import { AuthserviceService } from '../services/authservice.service';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonMenuButton,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

interface Bonus {
  nomeattr: string;
  livelloattr: string;
  bonus: string;
}

interface FocusAttr {
  attr: string;
  bonus: Bonus[];
}

@Component({
  selector: 'app-focusattr',
  templateUrl: './focusattr.page.html',
  styleUrls: ['./focusattr.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonItem,
    IonLabel,
    IonText,
    IonList,
    IonItemGroup,
    IonItemDivider,
  ],
})
export class FocusattrPage {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private authService = inject(AuthserviceService);
  public user = inject(User);

  listafocusattr: FocusAttr[] = [];

  ionViewWillEnter() {
    this.authService.focusattr(this.user.idutente).subscribe((data) => {
      this.listafocusattr = data;
      this.changeDetectorRef.markForCheck();
      //console.log('FocusAttr data:', this.listafocusattr);
    });
  }
}
