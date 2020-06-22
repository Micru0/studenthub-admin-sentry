import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UniversityFormPage } from './university-form.page';

const routes: Routes = [
  {
    path: '',
    component: UniversityFormPage
  },
  {
    path: ':university_id',
    component: UniversityFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversityFormPageRoutingModule {}
