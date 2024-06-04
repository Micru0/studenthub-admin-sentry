import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DegreeViewPageRoutingModule } from './degree-view-routing.module';

import { DegreeViewPage } from './degree-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    DegreeViewPageRoutingModule
  ],
  declarations: [DegreeViewPage]
})
export class DegreeViewPageModule {}
