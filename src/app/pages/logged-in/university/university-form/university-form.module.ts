import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UniversityFormPageRoutingModule } from './university-form-routing.module';

import { UniversityFormPage } from './university-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UniversityFormPageRoutingModule
  ],
  declarations: [UniversityFormPage]
})
export class UniversityFormPageModule {}
