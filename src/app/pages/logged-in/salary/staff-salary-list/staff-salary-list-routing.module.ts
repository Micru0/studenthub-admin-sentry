import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffSalaryListPage } from './staff-salary-list.page';

const routes: Routes = [
  {
    path: '',
    component: StaffSalaryListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffSalaryListPageRoutingModule {}
