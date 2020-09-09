import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectorListPage } from './inspector-list.page';

const routes: Routes = [
  {
    path: '',
    component: InspectorListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectorListPageRoutingModule {}
