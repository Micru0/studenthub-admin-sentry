import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffViewPageRoutingModule } from './staff-view-routing.module';

import { StaffViewPage } from './staff-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import {CandidateWorkHistoryModule} from '../../../../components/candidate-work-history/candidate-work-history.module';
import {RequestModule} from '../../../../components/request/request.module';
import {NoteModule} from '../../../../components/note/note.module';
import {NoItemsModule} from '../../../../components/no-items/no-items.module';
import {PipesModule} from '../../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    CandidateWorkHistoryModule,
    RequestModule,
    NoteModule,
    PipesModule,
    NoItemsModule,
    StaffViewPageRoutingModule
  ],
  declarations: [
      StaffViewPage
  ]
})
export class StaffViewPageModule {}
