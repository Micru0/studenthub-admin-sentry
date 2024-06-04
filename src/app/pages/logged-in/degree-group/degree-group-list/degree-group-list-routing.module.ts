import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DegreeGroupListPage } from './degree-group-list.page';

const routes: Routes = [
  {
    path: '',
    component: DegreeGroupListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DegreeGroupListPageRoutingModule {}
