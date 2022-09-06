import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestChecklistFormPage } from './request-checklist-form.page';

const routes: Routes = [
  {
    path: ':request_checklist_uuid',
    component: RequestChecklistFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestChecklistFormPageRoutingModule {}
