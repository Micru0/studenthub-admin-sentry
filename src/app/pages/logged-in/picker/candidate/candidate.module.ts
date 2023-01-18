import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidatePage } from './candidate.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModalModule,
    IonicModule,
  ],
  declarations: [
    CandidatePage
  ]
})
export class CandidatePageModule {}
