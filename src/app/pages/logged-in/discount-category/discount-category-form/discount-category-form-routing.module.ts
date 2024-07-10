import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountCategoryFormPage } from './discount-category-form.page';

const routes: Routes = [
  {
    path: ':id',
    component: DiscountCategoryFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountCategoryFormPageRoutingModule {}
