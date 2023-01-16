import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanEvalListPageRoutingModule } from './can-eval-list-routing.module';

import { CanEvalListPage } from './can-eval-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanEvalListPageRoutingModule
  ],
  declarations: [CanEvalListPage]
})
export class CanEvalListPageModule {}
