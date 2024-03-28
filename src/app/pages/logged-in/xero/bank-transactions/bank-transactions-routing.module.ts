import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankTransactionsPage } from './bank-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: BankTransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankTransactionsPageRoutingModule {}
