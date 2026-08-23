import { Component, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../globals';
import { AuthserviceService } from '../services/authservice.service';


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
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,  
})
export class FocusattrPage {
  constructor(private authService: AuthserviceService, private user: User) { }

  listafocusattr: FocusAttr[] = [];

  ionViewWillEnter() {
    this.authService.focusattr(this.user.idutente).subscribe(
      (data) => {
        this.listafocusattr = data;
        //console.log('FocusAttr data:', this.listafocusattr);
      }
    );
  }
}
