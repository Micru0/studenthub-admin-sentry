import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffSalaryRegisterPage } from './staff-salary-register.page';

const routes: Routes = [
  {
    path: '',
    component: StaffSalaryRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffSalaryRegisterPageRoutingModule {}
