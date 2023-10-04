import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaumPageRoutingModule } from './taum-routing.module';

import { TaumPage } from './taum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaumPageRoutingModule
  ],
  declarations: [TaumPage]
})
export class TaumPageModule {}
