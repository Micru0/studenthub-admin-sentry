import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuspiciousTransferViewPageRoutingModule } from './suspicious-transfer-view-routing.module';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import {SuspiciousTransferViewPage} from "./suspicious-transfer-view.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    LoadingModalModule,
    SuspiciousTransferViewPageRoutingModule
  ],
  exports: [
    PipesModule
  ],
  declarations: [SuspiciousTransferViewPage]
})
export class SuspiciousTransferViewPageModule {}
