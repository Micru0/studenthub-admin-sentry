import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanEvalQuesListPageRoutingModule } from './can-eval-ques-list-routing.module';

import { CanEvalQuesListPage } from './can-eval-ques-list.page';
import {LoadingModalModule} from "../../../../../components/loading-modal/loading-modal.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanEvalQuesListPageRoutingModule,
    LoadingModalModule
  ],
  declarations: [CanEvalQuesListPage]
})
export class CanEvalQuesListPageModule {}
