import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyStandupQuestionListPage } from './daily-standup-question-list.page';

const routes: Routes = [
  {
    path: '',
    component: DailyStandupQuestionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyStandupQuestionListPageRoutingModule {}
