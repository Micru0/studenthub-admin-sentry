import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { FulltimerComponent } from './fulltimer.component';

@NgModule({
  declarations: [
    FulltimerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    FulltimerComponent
  ]
})
export class FulltimerModule { }
