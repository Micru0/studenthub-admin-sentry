import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebhookFormPageRoutingModule } from './webhook-form-routing.module';

import { WebhookFormPage } from './webhook-form.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoadingModalModule,
    WebhookFormPageRoutingModule
  ],
  declarations: [WebhookFormPage]
})
export class WebhookFormPageModule {}
