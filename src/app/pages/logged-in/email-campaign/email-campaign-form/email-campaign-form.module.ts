import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailCampaignFormPageRoutingModule } from './email-campaign-form-routing.module';

import { EmailCampaignFormPage } from './email-campaign-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EmailCampaignFormPageRoutingModule
  ],
  declarations: [EmailCampaignFormPage]
})
export class EmailCampaignFormPageModule {}
