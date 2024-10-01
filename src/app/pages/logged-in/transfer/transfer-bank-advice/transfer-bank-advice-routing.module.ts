import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferBankAdvicePage } from './transfer-bank-advice.page';

const routes: Routes = [
  {
    path: '',
    component: TransferBankAdvicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferBankAdvicePageRoutingModule {}
