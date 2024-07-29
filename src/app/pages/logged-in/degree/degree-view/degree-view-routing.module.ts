import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DegreeViewPage } from './degree-view.page';

const routes: Routes = [
  {
    path: ':degree_uuid',
    component: DegreeViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DegreeViewPageRoutingModule {}
