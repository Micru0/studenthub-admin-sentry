import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestChecklistListPageRoutingModule } from './request-checklist-list-routing.module';

import { RequestChecklistListPage } from './request-checklist-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestChecklistListPageRoutingModule,
    LoadingModalModule,
    IonicModule
  ],
  declarations: [RequestChecklistListPage]
})
export class RequestChecklistListPageModule {}
