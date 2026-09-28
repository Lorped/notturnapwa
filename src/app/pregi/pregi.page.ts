import { ChangeDetectorRef, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User, pregiodifetto } from '../globals';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-pregi',
  templateUrl: './pregi.page.html',
  styleUrls: ['./pregi.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PregiPage {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  constructor(public user: User, public auth: AuthserviceService) {}

  listapregi: Array<pregiodifetto> = [];

  ionViewWillEnter() {
    this.auth.getpregi(this.user.idutente).subscribe((data: Array<pregiodifetto>) => {
      this.listapregi = Array.isArray(data) ? [...data] : [];
      this.changeDetectorRef.markForCheck();
      //console.log('Pregi e difetti:', this.listapregi);
      
    });
  }
}
