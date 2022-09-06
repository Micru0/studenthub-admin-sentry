import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestChecklistFormPageRoutingModule } from './request-checklist-form-routing.module';

import { RequestChecklistFormPage } from './request-checklist-form.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RequestChecklistFormPageRoutingModule,
    LoadingModalModule
  ],
  declarations: [RequestChecklistFormPage]
})
export class RequestChecklistFormPageModule {}
