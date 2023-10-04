import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpxPageRoutingModule } from './addpx-routing.module';

import { AddpxPage } from './addpx.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddpxPageRoutingModule
  ],
  declarations: [AddpxPage]
})
export class AddpxPageModule {}
