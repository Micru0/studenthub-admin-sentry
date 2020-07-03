import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffFormPageRoutingModule } from './staff-form-routing.module';

import { StaffFormPage } from './staff-form.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoadingModalModule,
    StaffFormPageRoutingModule
  ],
  declarations: [StaffFormPage]
})
export class StaffFormPageModule {}
