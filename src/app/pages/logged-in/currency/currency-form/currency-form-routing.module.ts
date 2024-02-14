import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyFormPage } from './currency-form.page';

const routes: Routes = [
  {
    path: '',
    component: CurrencyFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyFormPageRoutingModule {}
