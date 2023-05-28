import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebhookListPageRoutingModule } from './webhook-list-routing.module';

import { WebhookListPage } from './webhook-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    WebhookListPageRoutingModule
  ],
  declarations: [WebhookListPage]
})
export class WebhookListPageModule {}
