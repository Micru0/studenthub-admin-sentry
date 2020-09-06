import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminViewPage } from './admin-view.page';

const routes: Routes = [
  {
    path: ':admin_id',
    component: AdminViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminViewPageRoutingModule {}
