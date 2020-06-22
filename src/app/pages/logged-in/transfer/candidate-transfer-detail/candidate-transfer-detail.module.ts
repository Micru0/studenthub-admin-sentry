import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateTransferDetailPageRoutingModule } from './candidate-transfer-detail-routing.module';

import { CandidateTransferDetailPage } from './candidate-transfer-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandidateTransferDetailPageRoutingModule
  ],
  declarations: [CandidateTransferDetailPage]
})
export class CandidateTransferDetailPageModule {}
