import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffExpenseViewPage } from './staff-expense-view.page';

const routes: Routes = [
  {
    path: ':expense_uuid',
    component: StaffExpenseViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffExpenseViewPageRoutingModule {}
