import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayableCandidatesPageRoutingModule } from './payable-candidates-routing.module';

import { PayableCandidatesPage } from './payable-candidates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayableCandidatesPageRoutingModule
  ],
  declarations: [PayableCandidatesPage]
})
export class PayableCandidatesPageModule {}
