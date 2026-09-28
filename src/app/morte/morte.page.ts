import { Component, inject } from '@angular/core';
import { User } from '../globals';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-morte',
  templateUrl: './morte.page.html',
  styleUrls: ['./morte.page.scss'],
  imports: [IonicModule, FormsModule],
})
export class MortePage {
  private authservice = inject(AuthserviceService);
  public user = inject(User);
  private router = inject(Router);

  // ngOnInit() {}

  morte() {
    this.authservice.morteultima(this.user['idutente']).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
