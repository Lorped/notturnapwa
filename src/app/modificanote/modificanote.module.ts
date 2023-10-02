import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificanotePageRoutingModule } from './modificanote-routing.module';

import { ModificanotePage } from './modificanote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificanotePageRoutingModule
  ],
  declarations: [ModificanotePage]
})
export class ModificanotePageModule {}
