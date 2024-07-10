import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { IonicModule } from '@ionic/angular';

import { CompanyFormPageRoutingModule } from './company-form-routing.module';

import { CompanyFormPage } from './company-form.page';
//import {ImageUploadComponent} from 'src/app/components/image-upload/image-upload.component';
import { ImageUploadModule } from 'src/app/components/image-upload/image-upload.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CompanyFormPageRoutingModule,
    CKEditorModule,
    ImageUploadModule
  ],
  declarations: [CompanyFormPage]//ImageUploadComponent
})
export class CompanyFormPageModule {}
