import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountCategoryFormPageRoutingModule } from './discount-category-form-routing.module';

import { DiscountCategoryFormPage } from './discount-category-form.page';
import { ImageUploadModule } from 'src/app/components/image-upload/image-upload.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ImageUploadModule,
   // DiscountCategoryFormPageRoutingModule
  ],
  declarations: [DiscountCategoryFormPage]
})
export class DiscountCategoryFormPageModule {}
