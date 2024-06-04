import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MajorFormPage } from './major-form.page';

const routes: Routes = [
  {
    path: '',
    component: MajorFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MajorFormPageRoutingModule {}
