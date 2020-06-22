import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayableCandidatesPage } from './payable-candidates.page';

const routes: Routes = [
  {
    path: '',
    component: PayableCandidatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayableCandidatesPageRoutingModule {}
