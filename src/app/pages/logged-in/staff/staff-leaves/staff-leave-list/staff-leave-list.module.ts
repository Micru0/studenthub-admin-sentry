import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffLeaveListPageRoutingModule } from './staff-leave-list-routing.module';

import { StaffLeaveListPage } from './staff-leave-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffLeaveListPageRoutingModule
  ],
  declarations: [StaffLeaveListPage]
})
export class StaffLeaveListPageModule {}
