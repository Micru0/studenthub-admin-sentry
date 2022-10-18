import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignPermissionPage } from './assign-permission.page';

const routes: Routes = [
  {
    path: ':type/:user_id',
    component: AssignPermissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignPermissionPageRoutingModule {}
