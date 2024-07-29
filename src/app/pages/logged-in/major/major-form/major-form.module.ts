import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MajorFormPageRoutingModule } from './major-form-routing.module';

import { MajorFormPage } from './major-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MajorFormPageRoutingModule
  ],
  declarations: [MajorFormPage]
})
export class MajorFormPageModule {}
