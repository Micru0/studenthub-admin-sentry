import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyListPageRoutingModule } from './company-list-routing.module';

import { CompanyListPage } from './company-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import {NoItemsModule} from "src/app/components/no-items/no-items.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModalModule,
    IonicModule,
    NoItemsModule,
    CompanyListPageRoutingModule
  ],
  declarations: [CompanyListPage]
})
export class CompanyListPageModule {}
