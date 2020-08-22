import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyFormPageRoutingModule } from './company-form-routing.module';

import { CompanyFormPage } from './company-form.page';
import {ImageUploadComponent} from 'src/app/components/image-upload/image-upload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CompanyFormPageRoutingModule
  ],
  declarations: [CompanyFormPage, ImageUploadComponent]
})
export class CompanyFormPageModule {}
