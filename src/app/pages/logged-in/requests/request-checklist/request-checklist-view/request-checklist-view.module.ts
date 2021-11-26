import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestChecklistViewPageRoutingModule } from './request-checklist-view-routing.module';

import { RequestChecklistViewPage } from './request-checklist-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestChecklistViewPageRoutingModule,
    LoadingModalModule
  ],
  declarations: [RequestChecklistViewPage]
})
export class RequestChecklistViewPageModule {}
