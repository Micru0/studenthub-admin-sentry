import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignListPageRoutingModule } from './campaign-list-routing.module';

import { CampaignListPage } from './campaign-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { NoItemsModule } from 'src/app/components/no-items/no-items.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NoItemsModule,
    IonicModule,
    TranslateModule.forChild(),
    LoadingModalModule,
    CampaignListPageRoutingModule
  ],
  declarations: [CampaignListPage]
})
export class CampaignListPageModule {}
