import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateViewPage } from './candidate-view.page';

const routes: Routes = [
  {
    path: ':candidate_id',
    component: CandidateViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateViewPageRoutingModule {}
