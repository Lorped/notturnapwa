import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { User } from '../globals';
import { AuthserviceService } from '../services/authservice.service';
import { IonicModule } from '@ionic/angular';

interface Bonus {
  nomeattr: string;
  livelloattr: string;
  bonus: string;
}

interface FocusAttr {
  attr: string;
  bonus: Array<Bonus>;
}

@Component({
  selector: 'app-focusattr',
  templateUrl: './focusattr.page.html',
  styleUrls: ['./focusattr.page.scss'],
  imports: [IonicModule],
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
