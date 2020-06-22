import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferPaidPageRoutingModule } from './transfer-paid-routing.module';

import { TransferPaidPage } from './transfer-paid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferPaidPageRoutingModule
  ],
  declarations: [TransferPaidPage]
})
export class TransferPaidPageModule {}
