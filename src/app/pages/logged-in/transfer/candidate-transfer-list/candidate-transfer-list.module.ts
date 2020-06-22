import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateTransferListPageRoutingModule } from './candidate-transfer-list-routing.module';

import { CandidateTransferListPage } from './candidate-transfer-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandidateTransferListPageRoutingModule
  ],
  declarations: [CandidateTransferListPage]
})
export class CandidateTransferListPageModule {}
