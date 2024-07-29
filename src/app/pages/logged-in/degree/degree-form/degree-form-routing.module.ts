import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DegreeFormPage } from './degree-form.page';

const routes: Routes = [
  {
    path: '',
    component: DegreeFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DegreeFormPageRoutingModule {}
