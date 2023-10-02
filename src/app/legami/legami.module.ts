import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LegamiPageRoutingModule } from './legami-routing.module';

import { LegamiPage } from './legami.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LegamiPageRoutingModule
  ],
  declarations: [LegamiPage]
})
export class LegamiPageModule {}
