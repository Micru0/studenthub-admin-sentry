import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportPageRoutingModule } from './import-routing.module';

import { ImportPage } from './import.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ImportPageRoutingModule
  ],
  declarations: [ImportPage]
})
export class ImportPageModule {}
