import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DegreeGroupViewPage } from './degree-group-view.page';

const routes: Routes = [
  {
    path: ':degree_group_uuid',
    component: DegreeGroupViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DegreeGroupViewPageRoutingModule {}
