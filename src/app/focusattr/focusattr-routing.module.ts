import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FocusattrPage } from './focusattr.page';

const routes: Routes = [
  {
    path: '',
    component: FocusattrPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FocusattrPageRoutingModule {}
