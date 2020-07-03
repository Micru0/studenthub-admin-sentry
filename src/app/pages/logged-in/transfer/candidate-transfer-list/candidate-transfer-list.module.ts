import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateTransferListPageRoutingModule } from './candidate-transfer-list-routing.module';

import { CandidateTransferListPage } from './candidate-transfer-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModalModule,
    IonicModule,
    CandidateTransferListPageRoutingModule
  ],
  declarations: [CandidateTransferListPage]
})
export class CandidateTransferListPageModule {}
