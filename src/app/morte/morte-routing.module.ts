import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MortePage } from './morte.page';

const routes: Routes = [
  {
    path: '',
    component: MortePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MortePageRoutingModule {}
