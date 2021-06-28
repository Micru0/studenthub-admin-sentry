import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuspiciousTransferListRoutingModule } from './suspicious-transfer-list-routing.module';

import { SuspiciousTransferListPage } from './suspicious-transfer-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { DateDropdownModule } from 'src/app/components/date-dropdown/date-dropdown.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateDropdownModule,
    LoadingModalModule,
    SuspiciousTransferListRoutingModule
  ],
  declarations: [SuspiciousTransferListPage]
})
export class SuspiciousTransferListPageModule {}
