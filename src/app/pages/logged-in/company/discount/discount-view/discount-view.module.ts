import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountViewPageRoutingModule } from './discount-view-routing.module';

import { DiscountViewPage } from './discount-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscountViewPageRoutingModule
  ],
  declarations: [DiscountViewPage]
})
export class DiscountViewPageModule {}
