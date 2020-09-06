import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectorFormPage } from './inspector-form.page';

const routes: Routes = [
  {
    path: ':inspector_uuid',
    component: InspectorFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectorFormPageRoutingModule {}
