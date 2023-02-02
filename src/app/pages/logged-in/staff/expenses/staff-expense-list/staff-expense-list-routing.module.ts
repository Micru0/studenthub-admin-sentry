import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffExpenseListPage } from './staff-expense-list.page';

const routes: Routes = [
  {
    path: '',
    component: StaffExpenseListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffExpenseListPageRoutingModule {}
