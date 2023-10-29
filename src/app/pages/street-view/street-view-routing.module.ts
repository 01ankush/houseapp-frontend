import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreetViewPage } from './street-view.page';

const routes: Routes = [
  {
    path: '',
    component: StreetViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreetViewPageRoutingModule {}
