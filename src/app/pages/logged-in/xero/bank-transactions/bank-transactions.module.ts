import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankTransactionsPageRoutingModule } from './bank-transactions-routing.module';

import { BankTransactionsPage } from './bank-transactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankTransactionsPageRoutingModule
  ],
  declarations: [BankTransactionsPage]
})
export class BankTransactionsPageModule {}
