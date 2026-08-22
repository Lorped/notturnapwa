import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../globals';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-modificanote',
  templateUrl: './modificanote.page.html',
  styleUrls: ['./modificanote.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ModificanotePage implements OnInit {
  constructor(
    public user: User,
    private authService: AuthserviceService,
  ) {}

  noteiniziali = '';

  ngOnInit() {
    this.noteiniziali = this.user.note;
  }

  noteModificate(): boolean {
    return this.user.note !== this.noteiniziali;
  }

  modifica() {
    this.authService.modifcanote(this.user.idutente, this.user.note).subscribe((data) => {
      this.noteiniziali = this.user.note;
    });
  }
}
