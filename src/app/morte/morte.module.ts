import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MortePageRoutingModule } from './morte-routing.module';

import { MortePage } from './morte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MortePageRoutingModule
  ],
  declarations: [MortePage]
})
export class MortePageModule {}
