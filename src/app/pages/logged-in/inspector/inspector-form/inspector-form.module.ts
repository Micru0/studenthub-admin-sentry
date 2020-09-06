import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectorFormPageRoutingModule } from './inspector-form-routing.module';

import { InspectorFormPage } from './inspector-form.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoadingModalModule,
    InspectorFormPageRoutingModule
  ],
  declarations: [InspectorFormPage]
})
export class InspectorFormPageModule {}
