import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoteriPageRoutingModule } from './poteri-routing.module';

import { PoteriPage } from './poteri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoteriPageRoutingModule
  ],
  declarations: [PoteriPage]
})
export class PoteriPageModule {}
