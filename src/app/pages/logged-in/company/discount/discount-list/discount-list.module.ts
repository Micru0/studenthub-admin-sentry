import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountListPageRoutingModule } from './discount-list-routing.module';

import { DiscountListPage } from './discount-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { DiscountFormPageModule } from '../discount-form/discount-form.module';
import { DiscountViewPageModule } from '../discount-view/discount-view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    DiscountViewPageModule,
    DiscountFormPageModule,
    DiscountListPageRoutingModule
  ],
  declarations: [DiscountListPage]
})
export class DiscountListPageModule {}
