import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyViewPageRoutingModule } from './company-view-routing.module';

import { CompanyViewPage } from './company-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DiscountListPageModule } from '../discount/discount-list/discount-list.module';
import { DiscountFormPageModule } from '../discount/discount-form/discount-form.module';
import { DiscountViewPageModule } from '../discount/discount-view/discount-view.module';
import { NoItemsModule } from 'src/app/components/no-items/no-items.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModalModule,
    IonicModule,
    PipesModule,
    DiscountFormPageModule,
    DiscountViewPageModule,
    NoItemsModule,
    //DiscountListPageModule,
    CompanyViewPageRoutingModule
  ],
  declarations: [CompanyViewPage]
})
export class CompanyViewPageModule {}
