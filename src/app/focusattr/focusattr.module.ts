import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FocusattrPageRoutingModule } from './focusattr-routing.module';

import { FocusattrPage } from './focusattr.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FocusattrPageRoutingModule],
  declarations: [FocusattrPage],
})
export class FocusattrPageModule {}
