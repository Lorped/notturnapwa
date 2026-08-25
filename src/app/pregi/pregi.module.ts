import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PregiPageRoutingModule } from './pregi-routing.module';

import { PregiPage } from './pregi.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PregiPageRoutingModule],
  declarations: [PregiPage],
})
export class PregiPageModule {}
