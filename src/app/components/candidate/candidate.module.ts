import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CandidateComponent } from './candidate.component';

@NgModule({
  declarations: [
    CandidateComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    CandidateComponent
  ]
})
export class CandidateModule { }
