import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyStandupAnswerListPage } from './daily-standup-answer-list.page';

const routes: Routes = [
  {
    path: '',
    component: DailyStandupAnswerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class dailyStandupAnswerListRoutingModule {}
