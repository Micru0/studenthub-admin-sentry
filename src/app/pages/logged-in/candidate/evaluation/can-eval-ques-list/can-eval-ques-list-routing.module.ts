import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanEvalQuesListPage } from './can-eval-ques-list.page';

const routes: Routes = [
  {
    path: '',
    component: CanEvalQuesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanEvalQuesListPageRoutingModule {}
