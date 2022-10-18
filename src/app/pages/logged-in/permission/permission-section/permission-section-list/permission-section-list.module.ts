import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissionSectionListPageRoutingModule } from './permission-section-list-routing.module';

import { PermissionSectionListPage } from './permission-section-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    PermissionSectionListPageRoutingModule
  ],
  declarations: [PermissionSectionListPage]
})
export class PermissionSectionListPageModule {}
