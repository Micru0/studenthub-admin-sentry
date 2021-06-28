import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SuspiciousTransferListPage} from "./suspicious-transfer-list.page";

const routes: Routes = [
  {
    path: '',
    component: SuspiciousTransferListPage
  },
  {
    path: ':transfer_status',
    component: SuspiciousTransferListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuspiciousTransferListRoutingModule {}
