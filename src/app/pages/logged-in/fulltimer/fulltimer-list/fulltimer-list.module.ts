import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FulltimerListRoutingModule } from './fulltimer-list-routing.module';

import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import {CandidateModule} from '../../../../components/candidate/candidate.module';
import {FulltimerListPage} from "./fulltimer-list.page";
import {FulltimerModule} from "../../../../components/fulltimer/fulltimer.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    FulltimerListRoutingModule,
    CandidateModule,
    FulltimerModule
  ],
  declarations: [
      FulltimerListPage
  ]
})
export class FulltimerListModule {}
