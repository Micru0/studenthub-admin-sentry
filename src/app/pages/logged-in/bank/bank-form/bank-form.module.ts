import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankFormPageRoutingModule } from './bank-form-routing.module';

import { BankFormPage } from './bank-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BankFormPageRoutingModule
  ],
  declarations: [BankFormPage]
})
export class BankFormPageModule {}
