import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailCampaignListPageRoutingModule } from './email-campaign-list-routing.module';

import { EmailCampaignListPage } from './email-campaign-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { EmailCampaignFormPageModule } from '../email-campaign-form/email-campaign-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailCampaignListPageRoutingModule,
    EmailCampaignFormPageModule,
    LoadingModalModule
  ],
  declarations: [EmailCampaignListPage]
})
export class EmailCampaignListPageModule {}
