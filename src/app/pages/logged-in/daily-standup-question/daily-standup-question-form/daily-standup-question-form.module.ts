import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyStandupQuestionFormPageRoutingModule } from './daily-standup-question-form-routing.module';

import { DailyStandupQuestionFormPage } from './daily-standup-question-form.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    DailyStandupQuestionFormPageRoutingModule
  ],
  declarations: [DailyStandupQuestionFormPage]
})
export class DailyStandupQuestionFormPageModule {}
