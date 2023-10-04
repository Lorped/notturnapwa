import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelepatiaPageRoutingModule } from './telepatia-routing.module';

import { TelepatiaPage } from './telepatia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelepatiaPageRoutingModule
  ],
  declarations: [TelepatiaPage]
})
export class TelepatiaPageModule {}
