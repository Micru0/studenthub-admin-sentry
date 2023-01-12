import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffWorkSessionListPageRoutingModule } from './staff-work-session-list-routing.module';

import { StaffWorkSessionListPage } from './staff-work-session-list.page';
import {LoadingModalModule} from "../../../../components/loading-modal/loading-modal.module";
import {NoItemsModule} from "../../../../components/no-items/no-items.module";
import {PipesModule} from "../../../../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    StaffWorkSessionListPageRoutingModule,
    LoadingModalModule,
    NoItemsModule
  ],
  declarations: [StaffWorkSessionListPage]
})
export class StaffWorkSessionListPageModule {}
