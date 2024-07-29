import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountCategoryViewPageRoutingModule } from './discount-category-view-routing.module';

import { DiscountCategoryViewPage } from './discount-category-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    DiscountCategoryViewPageRoutingModule
  ],
  declarations: [DiscountCategoryViewPage]
})
export class DiscountCategoryViewPageModule {}
