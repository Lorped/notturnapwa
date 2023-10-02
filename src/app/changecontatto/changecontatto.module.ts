import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangecontattoPageRoutingModule } from './changecontatto-routing.module';

import { ChangecontattoPage } from './changecontatto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangecontattoPageRoutingModule
  ],
  declarations: [ChangecontattoPage]
})
export class ChangecontattoPageModule {}
