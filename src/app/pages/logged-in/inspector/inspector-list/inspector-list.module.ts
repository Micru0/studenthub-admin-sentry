import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectorListPageRoutingModule } from './inspector-list-routing.module';

import { InspectorListPage } from './inspector-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import {NoItemsModule} from "../../../../components/no-items/no-items.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModalModule,
    IonicModule,
    InspectorListPageRoutingModule,
    NoItemsModule
  ],
  declarations: [InspectorListPage]
})
export class InspectorListPageModule {}
