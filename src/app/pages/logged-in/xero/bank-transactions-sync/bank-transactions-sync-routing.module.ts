import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankTransactionsSyncPage } from './bank-transactions-sync.page';

const routes: Routes = [
  {
    path: '',
    component: BankTransactionsSyncPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankTransactionsSyncPageRoutingModule {}
