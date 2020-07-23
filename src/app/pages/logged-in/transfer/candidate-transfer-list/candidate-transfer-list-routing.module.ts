import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateTransferListPage } from './candidate-transfer-list.page';

const routes: Routes = [
  {
    path: ':tc_id',
    component: CandidateTransferListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateTransferListPageRoutingModule {}
