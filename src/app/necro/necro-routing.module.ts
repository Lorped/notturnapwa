import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NecroPage } from './necro.page';

const routes: Routes = [
  {
    path: '',
    component: NecroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NecroPageRoutingModule {}
