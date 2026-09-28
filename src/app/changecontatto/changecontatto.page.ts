import { Component, inject } from '@angular/core';
import { ToChange } from '../globals';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-changecontatto',
  templateUrl: './changecontatto.page.html',
  styleUrls: ['./changecontatto.page.scss'],
  imports: [IonicModule, FormsModule],
})
export class ChangecontattoPage {
  cell = {
    checked: true,
  };

  home = {
    checked: true,
  };

  public router = inject(Router);
  public authservice = inject(AuthserviceService);
  public tochange = inject(ToChange);

  change() {
    this.tochange.cell = 1;
    this.tochange.home = 1;
    if (this.cell.checked == false) {
      this.tochange.cell = 0;
    }
    if (this.home.checked == false) {
      this.tochange.home = 0;
    }

    this.authservice
      .changerubrica(
        this.tochange.idrubrica,
        this.tochange.contatto,
        this.tochange.cell,
        this.tochange.home,
        this.tochange.note
      )
      .subscribe(() => {
        this.router.navigate(['/tabs/rubrica']);
      });
  }

  ionViewWillEnter() {
    if (this.tochange.cell == 0) {
      this.cell.checked = false;
    }
    if (this.tochange.home == 0) {
      this.home.checked = false;
    }
    //console.log("in change2: ", this.tochange);
  }
}
