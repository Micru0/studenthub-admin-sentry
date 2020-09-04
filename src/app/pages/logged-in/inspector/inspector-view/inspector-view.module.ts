import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectorViewPageRoutingModule } from './inspector-view-routing.module';

import { InspectorViewPage } from './inspector-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    InspectorViewPageRoutingModule
  ],
  declarations: [InspectorViewPage]
})
export class InspectorViewPageModule {}
