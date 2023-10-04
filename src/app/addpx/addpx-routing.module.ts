import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpxPage } from './addpx.page';

const routes: Routes = [
  {
    path: '',
    component: AddpxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpxPageRoutingModule {}
