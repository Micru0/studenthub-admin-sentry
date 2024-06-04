import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DegreeGroupFormPageRoutingModule } from './degree-group-form-routing.module';

import { DegreeGroupFormPage } from './degree-group-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DegreeGroupFormPageRoutingModule
  ],
  declarations: [DegreeGroupFormPage]
})
export class DegreeGroupFormPageModule {}
