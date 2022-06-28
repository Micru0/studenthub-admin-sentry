import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseFormPageRoutingModule } from './expense-form-routing.module';

import { ExpenseFormPage } from './expense-form.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoadingModalModule,
    ExpenseFormPageRoutingModule
  ],
  declarations: [ExpenseFormPage]
})
export class ExpenseFormPageModule {}
