import { Component, inject } from '@angular/core';
import { User } from '../globals';
import { AuthserviceService } from '../services/authservice.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificanote',
  templateUrl: './modificanote.page.html',
  styleUrls: ['./modificanote.page.scss'],
  imports: [IonicModule, FormsModule],
})
export class ModificanotePage {
  private authService = inject(AuthserviceService);
  public user = inject(User);

  noteiniziali = '';

  ionViewWillEnter() {
    this.noteiniziali = this.user.note;
  }

  noteModificate(): boolean {
    return this.user.note != this.noteiniziali;
  }

  modifica() {
    this.authService
      .modifcanote(this.user.idutente, this.user.note)
      .subscribe(() => {
        this.noteiniziali = this.user.note;
      });
  }
}
