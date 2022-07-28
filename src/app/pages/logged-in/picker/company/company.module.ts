import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyPageRoutingModule } from './company-routing.module';

import { CompanyPage } from './company.page';
import {LoadingModalModule} from "../../../../components/loading-modal/loading-modal.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    CompanyPageRoutingModule
  ],
  declarations: [CompanyPage]
})
export class CompanyPageModule {}
