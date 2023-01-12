import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyStandupAnswerViewPage } from './daily-standup-answer-view.page';

const routes: Routes = [
  {
    path: '',
    component: DailyStandupAnswerViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyStandupAnswerViewPageRoutingModule {}
