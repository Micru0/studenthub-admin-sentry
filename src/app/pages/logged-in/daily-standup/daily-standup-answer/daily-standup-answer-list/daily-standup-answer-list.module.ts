import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyStandupAnswerListPage } from './daily-standup-answer-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import {dailyStandupAnswerListRoutingModule} from "./daily-standup-answer-list-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    dailyStandupAnswerListRoutingModule
  ],
  declarations: [DailyStandupAnswerListPage]
})
export class DailyStandupAnswerListModule {}
