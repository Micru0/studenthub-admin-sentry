import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockedIpListPage } from './blocked-ip-list.page';

const routes: Routes = [
  {
    path: '',
    component: BlockedIpListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockedIpListPageRoutingModule {}
