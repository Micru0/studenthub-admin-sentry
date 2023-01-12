import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyStandupAnswerViewPageRoutingModule } from './daily-standup-answer-view-routing.module';

import { DailyStandupAnswerViewPage } from './daily-standup-answer-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyStandupAnswerViewPageRoutingModule
  ],
  declarations: [DailyStandupAnswerViewPage]
})
export class DailyStandupAnswerViewPageModule {}
