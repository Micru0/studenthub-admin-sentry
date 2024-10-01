import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferBankAdvicePageRoutingModule } from './transfer-bank-advice-routing.module';

import { TransferBankAdvicePage } from './transfer-bank-advice.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    TransferBankAdvicePageRoutingModule
  ],
  declarations: [TransferBankAdvicePage]
})
export class TransferBankAdvicePageModule {}
