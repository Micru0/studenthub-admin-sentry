import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockedIpFormPageRoutingModule } from './blocked-ip-form-routing.module';

import { BlockedIpFormPage } from './blocked-ip-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BlockedIpFormPageRoutingModule
  ],
  declarations: [BlockedIpFormPage]
})
export class BlockedIpFormPageModule {}
