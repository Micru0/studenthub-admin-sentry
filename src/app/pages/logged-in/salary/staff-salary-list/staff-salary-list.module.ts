import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffSalaryListPageRoutingModule } from './staff-salary-list-routing.module';

import { StaffSalaryListPage } from './staff-salary-list.page';
import {LoadingModalModule} from "src/app/components/loading-modal/loading-modal.module";
import {NoItemsModule} from "../../../../components/no-items/no-items.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffSalaryListPageRoutingModule,
    LoadingModalModule,
    NoItemsModule
  ],
  declarations: [StaffSalaryListPage]
})
export class StaffSalaryListPageModule {}
