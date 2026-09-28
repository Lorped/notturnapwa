import { Component } from '@angular/core';
import { User, Userskill } from '../globals';

@Component({
  selector: 'app-background',
  templateUrl: './background.page.html',
  styleUrls: ['./background.page.scss'],
  standalone: false,
})
export class BackgroundPage  {
  constructor(public user: User, public userskill: Userskill) {}


}
