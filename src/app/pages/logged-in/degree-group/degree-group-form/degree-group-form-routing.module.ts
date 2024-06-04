import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DegreeGroupFormPage } from './degree-group-form.page';

const routes: Routes = [
  {
    path: '',
    component: DegreeGroupFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DegreeGroupFormPageRoutingModule {}
