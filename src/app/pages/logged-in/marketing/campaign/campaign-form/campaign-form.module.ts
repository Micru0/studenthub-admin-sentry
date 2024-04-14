import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignFormPageRoutingModule } from './campaign-form-routing.module';

import { CampaignFormPage } from './campaign-form.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignFormPageRoutingModule,
    //ComponentsModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  declarations: [CampaignFormPage]
})
export class CampaignFormPageModule {}
