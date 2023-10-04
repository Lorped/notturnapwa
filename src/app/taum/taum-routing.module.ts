import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaumPage } from './taum.page';

const routes: Routes = [
  {
    path: '',
    component: TaumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaumPageRoutingModule {}
