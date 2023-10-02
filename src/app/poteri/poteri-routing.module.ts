import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoteriPage } from './poteri.page';

const routes: Routes = [
  {
    path: '',
    component: PoteriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoteriPageRoutingModule {}
