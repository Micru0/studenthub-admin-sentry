import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffExpenseListPageRoutingModule } from './staff-expense-list-routing.module';

import { StaffExpenseListPage } from './staff-expense-list.page';
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StaffExpenseListPageRoutingModule,
        RouterModule
    ],
  declarations: [StaffExpenseListPage]
})
export class StaffExpenseListPageModule {}
