import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestChecklistViewPage } from './request-checklist-view.page';

const routes: Routes = [
  {
    path: ':request_checklist_uuid',
    component: RequestChecklistViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestChecklistViewPageRoutingModule {}
