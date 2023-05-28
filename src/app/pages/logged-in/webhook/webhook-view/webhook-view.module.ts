import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebhookViewPageRoutingModule } from './webhook-view-routing.module';

import { WebhookViewPage } from './webhook-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    WebhookViewPageRoutingModule
  ],
  declarations: [WebhookViewPage]
})
export class WebhookViewPageModule {}
