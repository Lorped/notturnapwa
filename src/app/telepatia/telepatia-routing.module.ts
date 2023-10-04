import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelepatiaPage } from './telepatia.page';

const routes: Routes = [
  {
    path: '',
    component: TelepatiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelepatiaPageRoutingModule {}
