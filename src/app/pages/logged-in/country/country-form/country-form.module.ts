import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryFormPageRoutingModule } from './country-form-routing.module';

import { CountryFormPage } from './country-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CountryFormPageRoutingModule
  ],
  declarations: [CountryFormPage]
})
export class CountryFormPageModule {}
