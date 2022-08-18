import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportSalaryFormPageRoutingModule } from './import-salary-form-routing.module';

import { ImportSalaryFormPage } from './import-salary-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportSalaryFormPageRoutingModule
  ],
  declarations: [ImportSalaryFormPage]
})
export class ImportSalaryFormPageModule {}
