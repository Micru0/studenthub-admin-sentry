import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferPaidPage } from './transfer-paid.page';

const routes: Routes = [
  {
    path: ':excel',
    component: TransferPaidPage
  },
  {
    path: ':excel/:bank',
    component: TransferPaidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferPaidPageRoutingModule {}
