import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UniversityViewPageRoutingModule } from './university-view-routing.module';

import { UniversityViewPage } from './university-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UniversityViewPageRoutingModule
  ],
  declarations: [UniversityViewPage]
})
export class UniversityViewPageModule {}
