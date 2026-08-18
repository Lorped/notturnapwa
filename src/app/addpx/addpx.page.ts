import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../globals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addpx',
  templateUrl: './addpx.page.html',
  styleUrls: ['./addpx.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AddpxPage implements OnInit {
  newpx: number = 0;

  constructor(public user: User, public http: HttpClient) {}

  ngOnInit() {}

  
}
