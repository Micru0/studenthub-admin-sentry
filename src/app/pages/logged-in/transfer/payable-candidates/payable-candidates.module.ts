import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayableCandidatesPageRoutingModule } from './payable-candidates-routing.module';

import { PayableCandidatesPage } from './payable-candidates.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { PayableCandidatesActionComponent } from './payable-candidates-action';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    
    PayableCandidatesPageRoutingModule
  ],
  declarations: [PayableCandidatesPage, PayableCandidatesActionComponent]
})
export class PayableCandidatesPageModule {}
