import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateTransferDetailPageRoutingModule } from './candidate-transfer-detail-routing.module';

import { CandidateTransferDetailPage } from './candidate-transfer-detail.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    CandidateTransferDetailPageRoutingModule
  ],
  declarations: [CandidateTransferDetailPage]
})
export class CandidateTransferDetailPageModule {}
