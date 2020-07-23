import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffFormPage } from './staff-form.page';

const routes: Routes = [
  {
    path: ':staff_id',
    component: StaffFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffFormPageRoutingModule {}
