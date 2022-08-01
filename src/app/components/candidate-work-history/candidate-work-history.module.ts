import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CandidateWorkHistoryComponent } from './candidate-work-history.component';

@NgModule({
  declarations: [
    CandidateWorkHistoryComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    CandidateWorkHistoryComponent
  ]
})
export class CandidateWorkHistoryModule { }
