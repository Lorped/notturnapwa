import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangecontattoPage } from './changecontatto.page';

const routes: Routes = [
  {
    path: '',
    component: ChangecontattoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangecontattoPageRoutingModule {}
