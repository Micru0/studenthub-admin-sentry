import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffWorkSessionListPageRoutingModule } from './staff-work-session-list-routing.module';

import { StaffWorkSessionListPage } from './staff-work-session-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffWorkSessionListPageRoutingModule
  ],
  declarations: [StaffWorkSessionListPage]
})
export class StaffWorkSessionListPageModule {}
