import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MajorViewPage } from './major-view.page';

const routes: Routes = [
  {
    path: ':major_uuid',
    component: MajorViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MajorViewPageRoutingModule {}
