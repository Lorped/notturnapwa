import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User, Userskill } from '../globals';

@Component({
  selector: 'app-background',
  templateUrl: './background.page.html',
  styleUrls: ['./background.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class BackgroundPage implements OnInit {
  constructor(public user: User, public userskill: Userskill) {}

  ngOnInit() {}
}
