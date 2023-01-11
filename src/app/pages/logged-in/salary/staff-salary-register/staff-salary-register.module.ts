import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffSalaryRegisterPageRoutingModule } from './staff-salary-register-routing.module';

import { StaffSalaryRegisterPage } from './staff-salary-register.page';
import {LoadingModalModule} from "../../../../components/loading-modal/loading-modal.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffSalaryRegisterPageRoutingModule,
    LoadingModalModule
  ],
  declarations: [StaffSalaryRegisterPage]
})
export class StaffSalaryRegisterPageModule {}
