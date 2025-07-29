import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignPermissionPageRoutingModule } from './assign-permission-routing.module';

import { AssignPermissionPage } from './assign-permission.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    AssignPermissionPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [AssignPermissionPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AssignPermissionPageModule {}
