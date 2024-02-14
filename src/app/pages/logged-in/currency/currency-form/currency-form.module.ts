import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrencyFormPageRoutingModule } from './currency-form-routing.module';

import { CurrencyFormPage } from './currency-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CurrencyFormPageRoutingModule
  ],
  declarations: [CurrencyFormPage]
})
export class CurrencyFormPageModule {}
