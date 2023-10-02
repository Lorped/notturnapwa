import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NecroPageRoutingModule } from './necro-routing.module';

import { NecroPage } from './necro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NecroPageRoutingModule
  ],
  declarations: [NecroPage]
})
export class NecroPageModule {}
