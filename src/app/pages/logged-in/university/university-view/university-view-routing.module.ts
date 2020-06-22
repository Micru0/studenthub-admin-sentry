import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UniversityViewPage } from './university-view.page';

const routes: Routes = [
  {
    path: ':university_id',
    component: UniversityViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversityViewPageRoutingModule {}
