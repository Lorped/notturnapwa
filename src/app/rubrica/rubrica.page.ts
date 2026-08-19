import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { RubricaItem, User } from '../globals';

@Component({
  selector: 'app-rubrica',
  templateUrl: './rubrica.page.html',
  styleUrls: ['./rubrica.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class RubricaPage implements OnInit {
  constructor(private authservice: AuthserviceService, private user: User) {}

  rubrica: Array<RubricaItem> = [];

  ngOnInit() {
  }

   ionViewWillEnter(){
    this.authservice.loadrubrica(this.user.idutente).subscribe((data) => {
      this.rubrica = data;
    });
   }

  add() {}
  edit(id: number) {}
  delete(id: number) {}

  

}
