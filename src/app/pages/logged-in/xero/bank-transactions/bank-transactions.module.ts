import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankTransactionsPageRoutingModule } from './bank-transactions-routing.module';

import { BankTransactionsPage } from './bank-transactions.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    BankTransactionsPageRoutingModule
  ],
  declarations: [BankTransactionsPage]
})
export class BankTransactionsPageModule {}
