import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MajorListPageRoutingModule } from './major-list-routing.module';

import { MajorListPage } from './major-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    MajorListPageRoutingModule
  ],
  declarations: [MajorListPage]
})
export class MajorListPageModule {}
