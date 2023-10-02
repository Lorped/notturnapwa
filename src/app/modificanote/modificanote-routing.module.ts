import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificanotePage } from './modificanote.page';

const routes: Routes = [
  {
    path: '',
    component: ModificanotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificanotePageRoutingModule {}
