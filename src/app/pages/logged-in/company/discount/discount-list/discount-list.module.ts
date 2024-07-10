import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountListPageRoutingModule } from './discount-list-routing.module';

import { DiscountListPage } from './discount-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscountListPageRoutingModule
  ],
  declarations: [DiscountListPage]
})
export class DiscountListPageModule {}
