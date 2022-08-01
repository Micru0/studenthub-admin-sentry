import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateListPageRoutingModule } from './candidate-list-routing.module';

import { CandidateListPage } from './candidate-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import {CandidateModule} from '../../../../components/candidate/candidate.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    CandidateListPageRoutingModule,
    CandidateModule
  ],
  declarations: [
      CandidateListPage
  ]
})
export class CandidateListPageModule {}
