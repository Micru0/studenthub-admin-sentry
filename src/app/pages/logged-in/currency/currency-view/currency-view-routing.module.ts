import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyViewPage } from './currency-view.page';

const routes: Routes = [
  {
    path: ':currency_id',
    component: CurrencyViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyViewPageRoutingModule {}
