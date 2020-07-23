import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffViewPage } from './staff-view.page';

const routes: Routes = [
  {
    path: ':staff_id',
    component: StaffViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffViewPageRoutingModule {}
