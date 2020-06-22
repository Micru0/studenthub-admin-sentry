import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffViewPageRoutingModule } from './staff-view-routing.module';

import { StaffViewPage } from './staff-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffViewPageRoutingModule
  ],
  declarations: [StaffViewPage]
})
export class StaffViewPageModule {}
