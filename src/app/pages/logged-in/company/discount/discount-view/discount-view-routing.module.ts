import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountViewPage } from './discount-view.page';

const routes: Routes = [
  {
    path: '',
    component: DiscountViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountViewPageRoutingModule {}
