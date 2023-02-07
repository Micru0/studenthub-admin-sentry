import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffLeaveListPage } from './staff-leave-list.page';

const routes: Routes = [
  {
    path: '',
    component: StaffLeaveListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffLeaveListPageRoutingModule {}
