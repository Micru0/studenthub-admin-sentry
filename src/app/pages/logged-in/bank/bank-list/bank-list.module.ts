import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankListPageRoutingModule } from './bank-list-routing.module';

import { BankListPage } from './bank-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankListPageRoutingModule
  ],
  declarations: [BankListPage]
})
export class BankListPageModule {}
