import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffViewPageRoutingModule } from './staff-view-routing.module';

import { StaffViewPage } from './staff-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    StaffViewPageRoutingModule
  ],
  declarations: [StaffViewPage]
})
export class StaffViewPageModule {}
