import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CacciaPage } from './caccia.page';

const routes: Routes = [
  {
    path: '',
    component: CacciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CacciaPageRoutingModule {}
