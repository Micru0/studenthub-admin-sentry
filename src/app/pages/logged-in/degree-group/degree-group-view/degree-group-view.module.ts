import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DegreeGroupViewPageRoutingModule } from './degree-group-view-routing.module';

import { DegreeGroupViewPage } from './degree-group-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    DegreeGroupViewPageRoutingModule
  ],
  declarations: [DegreeGroupViewPage]
})
export class DegreeGroupViewPageModule {}
