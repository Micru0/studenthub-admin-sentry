import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FulltimerViewRoutingModule } from './fulltimer-view-routing.module';

import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { NoItemsModule } from 'src/app/components/no-items/no-items.module';
import {FulltimerViewPage} from "./fulltimer-view.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    NoItemsModule,
    FulltimerViewRoutingModule
  ],
  declarations: [FulltimerViewPage]
})
export class FulltimerViewModule {}
