import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminFormPageRoutingModule } from './admin-form-routing.module';

import { AdminFormPage } from './admin-form.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoadingModalModule,
    AdminFormPageRoutingModule
  ],
  declarations: [AdminFormPage]
})
export class AdminFormPageModule {}
