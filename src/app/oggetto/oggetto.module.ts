import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OggettoPageRoutingModule } from './oggetto-routing.module';

import { OggettoPage } from './oggetto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OggettoPageRoutingModule
  ],
  declarations: [OggettoPage]
})
export class OggettoPageModule {}
