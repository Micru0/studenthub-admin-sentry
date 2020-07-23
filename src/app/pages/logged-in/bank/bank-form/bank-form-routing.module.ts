import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankFormPage } from './bank-form.page';

const routes: Routes = [
  {
    path: ':bank_id',
    component: BankFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankFormPageRoutingModule {}
