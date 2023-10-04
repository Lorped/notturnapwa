import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OggettoPage } from './oggetto.page';

const routes: Routes = [
  {
    path: '',
    component: OggettoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OggettoPageRoutingModule {}
