import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyContactListPageRoutingModule } from './company-contact-list-routing.module';

import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import {CompanyContactListPage} from "./company-contact-list.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    CompanyContactListPageRoutingModule
  ],
  declarations: [
      CompanyContactListPage
  ]
})
export class CompanyContactListModule {}
