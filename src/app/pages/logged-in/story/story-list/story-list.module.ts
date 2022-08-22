import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoryListPageRoutingModule } from './story-list-routing.module';

import { StoryListPage } from './story-list.page';
import {NoItemsModule} from '../../../../components/no-items/no-items.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoItemsModule,
    StoryListPageRoutingModule
  ],
  declarations: [StoryListPage]
})
export class StoryListPageModule {}
