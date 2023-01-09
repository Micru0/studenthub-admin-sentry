import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffWorkSessionListPage } from './staff-work-session-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { StaffWorkSessionListRoutingModule } from "./staff-work-session-list-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    StaffWorkSessionListRoutingModule
  ],
  declarations: [StaffWorkSessionListPage]
})
export class StaffWorkSessionListModule {}
