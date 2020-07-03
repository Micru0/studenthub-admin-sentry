import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferViewPageRoutingModule } from './transfer-view-routing.module';

import { TransferViewPage } from './transfer-view.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    LoadingModalModule,
    TransferViewPageRoutingModule
  ],
  exports: [
    PipesModule
  ],
  declarations: [TransferViewPage]
})
export class TransferViewPageModule {}
