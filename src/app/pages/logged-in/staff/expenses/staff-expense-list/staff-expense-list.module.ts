import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffExpenseListPageRoutingModule } from './staff-expense-list-routing.module';

import { StaffExpenseListPage } from './staff-expense-list.page';
import {RouterModule} from "@angular/router";
import {NoItemsModule} from "src/app/components/no-items/no-items.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StaffExpenseListPageRoutingModule,
        RouterModule,
        NoItemsModule
    ],
  declarations: [StaffExpenseListPage]
})
export class StaffExpenseListPageModule {}
