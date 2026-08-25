import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RubricaPageRoutingModule } from './rubrica-routing.module';

import { RubricaPage } from './rubrica.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RubricaPageRoutingModule],
  declarations: [RubricaPage],
})
export class RubricaPageModule {}
