import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountCategoryListPageRoutingModule } from './discount-category-list-routing.module';

import { DiscountCategoryListPage } from './discount-category-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { DiscountCategoryFormPageModule } from '../discount-category-form/discount-category-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    DiscountCategoryFormPageModule,
    DiscountCategoryListPageRoutingModule
  ],
  declarations: [DiscountCategoryListPage]
})
export class DiscountCategoryListPageModule {}
