import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailLogViewPageRoutingModule } from './mail-log-view-routing.module';

import { MailLogViewPage } from './mail-log-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    MailLogViewPageRoutingModule
  ],
  declarations: [MailLogViewPage]
})
export class MailLogViewPageModule {}
