import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateReviewListPageRoutingModule } from './candidate-review-list-routing.module';

import { CandidateReviewListPage } from './candidate-review-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandidateReviewListPageRoutingModule
  ],
  declarations: [CandidateReviewListPage]
})
export class CandidateReviewListPageModule {}
