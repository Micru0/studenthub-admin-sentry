import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanEvalQuesDeptFormPage } from './can-eval-ques-dept-form.page';

const routes: Routes = [
  {
    path: '',
    component: CanEvalQuesDeptFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanEvalQuesDeptFormPageRoutingModule {}
