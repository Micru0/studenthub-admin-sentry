import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DegreeFormPageRoutingModule } from './degree-form-routing.module';

import { DegreeFormPage } from './degree-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DegreeFormPageRoutingModule
  ],
  declarations: [DegreeFormPage]
})
export class DegreeFormPageModule {}
