import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidatePaymentSearchPageRoutingModule } from './candidate-payment-search-routing.module';

import { CandidatePaymentSearchPage } from './candidate-payment-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandidatePaymentSearchPageRoutingModule
  ],
  declarations: [CandidatePaymentSearchPage]
})
export class CandidatePaymentSearchPageModule {}
