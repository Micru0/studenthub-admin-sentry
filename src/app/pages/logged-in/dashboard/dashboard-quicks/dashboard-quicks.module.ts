import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardQuicksRoutingModule } from './dashboard-quicks-routing.module';

import { DashboardQuicksPage } from './dashboard-quicks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardQuicksRoutingModule
  ],
  declarations: [DashboardQuicksPage]
})
export class DashboardQuicksPageModule {}
