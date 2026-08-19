import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RubricaPage } from './rubrica.page';

const routes: Routes = [
  {
    path: '',
    component: RubricaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RubricaPageRoutingModule {}
