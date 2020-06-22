import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankViewPage } from './bank-view.page';

const routes: Routes = [
  {
    path: ':bank_id',
    component: BankViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankViewPageRoutingModule {}
