import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignPermissionPageRoutingModule } from './assign-permission-routing.module';

import { AssignPermissionPage } from './assign-permission.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    AssignPermissionPageRoutingModule
  ],
  declarations: [AssignPermissionPage]
})
export class AssignPermissionPageModule {}
