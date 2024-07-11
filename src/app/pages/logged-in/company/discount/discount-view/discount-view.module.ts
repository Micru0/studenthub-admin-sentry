import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountViewPageRoutingModule } from './discount-view-routing.module';

import { DiscountViewPage } from './discount-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    DiscountViewPageRoutingModule
  ],
  declarations: [DiscountViewPage]
})
export class DiscountViewPageModule {}
