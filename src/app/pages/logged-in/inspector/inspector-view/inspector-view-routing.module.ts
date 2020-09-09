import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectorViewPage } from './inspector-view.page';

const routes: Routes = [
  {
    path: ':inspector_uuid',
    component: InspectorViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectorViewPageRoutingModule {}
