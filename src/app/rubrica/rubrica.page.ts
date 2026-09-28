import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { RubricaItem, User, ToChange } from '../globals';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-rubrica',
  templateUrl: './rubrica.page.html',
  styleUrls: ['./rubrica.page.scss'],
  imports: [IonicModule],
})
export class RubricaPage {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  private authservice = inject(AuthserviceService);
  public user = inject(User);
  private router = inject(Router);
  private tochange = inject(ToChange);

  rubrica: Array<RubricaItem> = [];

  ionViewWillEnter() {
    this.authservice.loadrubrica(this.user.idutente).subscribe((data) => {
      this.rubrica = data;
      this.changeDetectorRef.markForCheck();
    });
  }

  add() {
    this.router.navigate(['/tabs/addcontatto']);
  }
  edit(id: number) {
    const tochange = this.rubrica.find((item) => item.idrubrica === id);
    if (tochange) {
      this.tochange.idrubrica = tochange.idrubrica;
      this.tochange.contatto = tochange.contatto;
      this.tochange.cell = tochange.cell;
      this.tochange.home = tochange.home;
      this.tochange.note = tochange.note;

      this.router.navigate(['/tabs/changecontatto']);
    }
  }

  delete(id: number) {
    this.authservice.delrubrica(id).subscribe(() => {
      this.authservice.loadrubrica(this.user.idutente).subscribe(() => {
        this.ionViewWillEnter();
      });
    });
  }
}
