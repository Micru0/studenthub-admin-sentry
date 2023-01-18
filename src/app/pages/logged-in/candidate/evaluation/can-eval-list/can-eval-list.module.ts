import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanEvalListPageRoutingModule } from './can-eval-list-routing.module';

import { CanEvalListPage } from './can-eval-list.page';
import {NoItemsModule} from "../../../../../components/no-items/no-items.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CanEvalListPageRoutingModule,
        NoItemsModule
    ],
  declarations: [CanEvalListPage]
})
export class CanEvalListPageModule {}
