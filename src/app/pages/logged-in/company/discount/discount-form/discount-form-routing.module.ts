import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountFormPage } from './discount-form.page';

const routes: Routes = [
  {
    path: '',
    component: DiscountFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountFormPageRoutingModule {}
