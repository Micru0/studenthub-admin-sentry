import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffLeaveViewPageRoutingModule } from './staff-leave-view-routing.module';

import { StaffLeaveViewPage } from './staff-leave-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffLeaveViewPageRoutingModule
  ],
  declarations: [StaffLeaveViewPage]
})
export class StaffLeaveViewPageModule {}
