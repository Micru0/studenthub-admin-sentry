import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferFileListPageRoutingModule } from './transfer-file-list-routing.module';

import { TransferFileListPage } from './transfer-file-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    TransferFileListPageRoutingModule
  ],
  declarations: [TransferFileListPage]
})
export class TransferFileListPageModule {}
