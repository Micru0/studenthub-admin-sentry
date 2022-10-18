import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionSectionListPage } from './permission-section-list.page';

const routes: Routes = [
  {
    path: '',
    component: PermissionSectionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionSectionListPageRoutingModule {}
