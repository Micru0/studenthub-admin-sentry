import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoryViewPageRoutingModule } from './story-view-routing.module';

import { StoryViewPage } from './story-view.page';
import {NoItemsModule} from 'src/app/components/no-items/no-items.module';
import {CandidateModule} from 'src/app/components/candidate/candidate.module';
import {PipesModule} from 'src/app/pipes/pipes.module';
import {LoadingModalModule} from '../../../../components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    NoItemsModule,
    CandidateModule,
    LoadingModalModule,
    StoryViewPageRoutingModule
  ],
  declarations: [StoryViewPage]
})
export class StoryViewPageModule {}
