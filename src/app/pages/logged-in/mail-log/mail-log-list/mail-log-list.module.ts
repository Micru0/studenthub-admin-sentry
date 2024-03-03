import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailLogListPageRoutingModule } from './mail-log-list-routing.module';

import { MailLogListPage } from './mail-log-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    MailLogListPageRoutingModule
  ],
  declarations: [MailLogListPage]
})
export class MailLogListPageModule {}
