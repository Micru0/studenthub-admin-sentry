import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagListPageRoutingModule } from './tag-list-routing.module';

import { TagListPage } from './tag-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    TagListPageRoutingModule
  ],
  declarations: [TagListPage]
})
export class TagListPageModule {}
