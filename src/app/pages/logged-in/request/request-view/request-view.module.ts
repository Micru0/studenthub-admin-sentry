import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestViewPageRoutingModule } from './request-view-routing.module';

import { RequestViewPage } from './request-view.page';
import {NoItemsModule} from 'src/app/components/no-items/no-items.module';
import {CandidateModule} from 'src/app/components/candidate/candidate.module';
import {PipesModule} from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    NoItemsModule,
    CandidateModule,
    RequestViewPageRoutingModule
  ],
  declarations: [RequestViewPage]
})
export class RequestViewPageModule {}
