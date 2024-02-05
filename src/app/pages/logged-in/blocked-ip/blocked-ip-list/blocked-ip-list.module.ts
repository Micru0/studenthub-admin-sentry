import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockedIpListPageRoutingModule } from './blocked-ip-list-routing.module';

import { BlockedIpListPage } from './blocked-ip-list.page';
import { BlockedIpFormPageModule } from '../blocked-ip-form/blocked-ip-form.module';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    BlockedIpListPageRoutingModule
  ],
  declarations: [BlockedIpListPage]
})
export class BlockedIpListPageModule {}
