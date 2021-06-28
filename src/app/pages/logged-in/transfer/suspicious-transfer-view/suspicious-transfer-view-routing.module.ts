import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuspiciousTransferViewPage } from './suspicious-transfer-view.page';

const routes: Routes = [
  {
    path: ':transfer_id',
    component: SuspiciousTransferViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuspiciousTransferViewPageRoutingModule {}
