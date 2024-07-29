import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MajorListPage } from './major-list.page';

const routes: Routes = [
  {
    path: '',
    component: MajorListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MajorListPageRoutingModule {}
