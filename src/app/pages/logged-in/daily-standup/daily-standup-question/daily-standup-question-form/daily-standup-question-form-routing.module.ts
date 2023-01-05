import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyStandupQuestionFormPage } from './daily-standup-question-form.page';

const routes: Routes = [
  {
    path: ':question_uuid',
    component: DailyStandupQuestionFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyStandupQuestionFormPageRoutingModule {}
