import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignedCandidatePageRoutingModule } from './assigned-candidate-routing.module';

import { AssignedCandidatePage } from './assigned-candidate.page';
import {LoadingModalModule} from '../../../../components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    AssignedCandidatePageRoutingModule
  ],
  declarations: [AssignedCandidatePage]
})
export class AssignedCandidatePageModule {}
