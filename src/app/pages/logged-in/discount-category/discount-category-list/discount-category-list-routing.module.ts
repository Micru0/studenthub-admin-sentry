import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountCategoryListPage } from './discount-category-list.page';

const routes: Routes = [
  {
    path: '',
    component: DiscountCategoryListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountCategoryListPageRoutingModule {}
