import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyStandupQuestionListPageRoutingModule } from './daily-standup-question-list-routing.module';

import { DailyStandupQuestionListPage } from './daily-standup-question-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    DailyStandupQuestionListPageRoutingModule
  ],
  declarations: [DailyStandupQuestionListPage]
})
export class DailyStandupQuestionListPageModule {}
