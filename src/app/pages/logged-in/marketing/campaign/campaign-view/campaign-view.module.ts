import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignViewPageRoutingModule } from './campaign-view-routing.module';

import { CampaignViewPage } from './campaign-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    LoadingModalModule,
    CampaignViewPageRoutingModule
  ],
  declarations: [CampaignViewPage]
})
export class CampaignViewPageModule {}
