import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebhookTestPageRoutingModule } from './webhook-test-routing.module';

import { WebhookTestPage } from './webhook-test.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoadingModalModule,
    WebhookTestPageRoutingModule
  ],
  declarations: [WebhookTestPage]
})
export class WebhookTestPageModule {}
