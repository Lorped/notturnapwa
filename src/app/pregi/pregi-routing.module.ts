import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PregiPage } from './pregi.page';

const routes: Routes = [
  {
    path: '',
    component: PregiPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PregiPageRoutingModule {}
