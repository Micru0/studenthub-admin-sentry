import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffExpenseViewPageRoutingModule } from './staff-expense-view-routing.module';

import { StaffExpenseViewPage } from './staff-expense-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    StaffExpenseViewPageRoutingModule
  ],
  declarations: [StaffExpenseViewPage]
})
export class StaffExpenseViewPageModule {}
