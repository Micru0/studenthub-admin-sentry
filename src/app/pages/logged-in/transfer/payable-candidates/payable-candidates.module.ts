import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayableCandidatesPageRoutingModule } from './payable-candidates-routing.module';

import { PayableCandidatesPage } from './payable-candidates.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { PayableCandidatesActionComponent } from './payable-candidates-action';
import { CandidatePageModule } from '../../picker/candidate/candidate.module';
import { NoItemsModule } from 'src/app/components/no-items/no-items.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoItemsModule,
    PipesModule,
    LoadingModalModule,
    CandidatePageModule,
    PayableCandidatesPageRoutingModule
  ],
  declarations: [PayableCandidatesPage, PayableCandidatesActionComponent]
})
export class PayableCandidatesPageModule {}
