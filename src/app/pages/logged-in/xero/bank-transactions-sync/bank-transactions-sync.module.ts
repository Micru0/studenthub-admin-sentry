import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankTransactionsSyncPageRoutingModule } from './bank-transactions-sync-routing.module';

import { BankTransactionsSyncPage } from './bank-transactions-sync.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankTransactionsSyncPageRoutingModule
  ],
  declarations: [BankTransactionsSyncPage]
})
export class BankTransactionsSyncPageModule {}
