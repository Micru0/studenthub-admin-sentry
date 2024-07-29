import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DegreeListPage } from './degree-list.page';

const routes: Routes = [
  {
    path: '',
    component: DegreeListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DegreeListPageRoutingModule {}
