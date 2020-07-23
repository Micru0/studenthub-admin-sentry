import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateTransferDetailPage } from './candidate-transfer-detail.page';

const routes: Routes = [
  {
    path: ':tc_id',
    component: CandidateTransferDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateTransferDetailPageRoutingModule {}
