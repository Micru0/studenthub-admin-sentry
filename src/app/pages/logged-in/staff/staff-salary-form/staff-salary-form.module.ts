import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffSalaryFormPageRoutingModule } from './staff-salary-form-routing.module';

import { StaffSalaryFormPage } from './staff-salary-form.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StaffSalaryFormPageRoutingModule,
    LoadingModalModule
  ],
  declarations: [StaffSalaryFormPage]
})
export class StaffSalaryFormPageModule {}
