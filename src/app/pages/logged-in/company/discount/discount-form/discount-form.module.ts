import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountFormPageRoutingModule } from './discount-form-routing.module';

import { DiscountFormPage } from './discount-form.page';
import { ImageUploadModule } from 'src/app/components/image-upload/image-upload.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ImageUploadModule,
    DiscountFormPageRoutingModule
  ],
  declarations: [DiscountFormPage]
})
export class DiscountFormPageModule {}
