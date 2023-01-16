import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanEvalQuesDeptFormPageRoutingModule } from './can-eval-ques-dept-form-routing.module';

import { CanEvalQuesDeptFormPage } from './can-eval-ques-dept-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CanEvalQuesDeptFormPageRoutingModule,
    IonicModule
  ],
  declarations: [CanEvalQuesDeptFormPage]
})
export class CanEvalQuesDeptFormPageModule {}
