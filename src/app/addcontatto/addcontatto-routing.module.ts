import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcontattoPage } from './addcontatto.page';

const routes: Routes = [
  {
    path: '',
    component: AddcontattoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcontattoPageRoutingModule {}
