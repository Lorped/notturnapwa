import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegamiPage } from './legami.page';

const routes: Routes = [
  {
    path: '',
    component: LegamiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegamiPageRoutingModule {}
