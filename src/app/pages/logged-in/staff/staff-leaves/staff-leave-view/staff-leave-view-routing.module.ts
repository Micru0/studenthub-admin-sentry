import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffLeaveViewPage } from './staff-leave-view.page';

const routes: Routes = [
  {
    path: '',
    component: StaffLeaveViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffLeaveViewPageRoutingModule {}
