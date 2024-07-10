import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountFormPageRoutingModule } from './discount-form-routing.module';

import { DiscountFormPage } from './discount-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscountFormPageRoutingModule
  ],
  declarations: [DiscountFormPage]
})
export class DiscountFormPageModule {}
