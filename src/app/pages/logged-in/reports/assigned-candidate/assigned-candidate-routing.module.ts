import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignedCandidatePage } from './assigned-candidate.page';

const routes: Routes = [
  {
    path: '',
    component: AssignedCandidatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignedCandidatePageRoutingModule {}
