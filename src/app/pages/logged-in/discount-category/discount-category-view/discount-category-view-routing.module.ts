import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountCategoryViewPage } from './discount-category-view.page';

const routes: Routes = [
  {
    path: ':id',
    component: DiscountCategoryViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountCategoryViewPageRoutingModule {}
