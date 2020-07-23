import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidatePaymentSearchPage } from './candidate-payment-search.page';

const routes: Routes = [
  {
    path: '',
    component: CandidatePaymentSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidatePaymentSearchPageRoutingModule {}
