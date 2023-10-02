import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CacciaPageRoutingModule } from './caccia-routing.module';

import { CacciaPage } from './caccia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CacciaPageRoutingModule
  ],
  declarations: [CacciaPage]
})
export class CacciaPageModule {}
