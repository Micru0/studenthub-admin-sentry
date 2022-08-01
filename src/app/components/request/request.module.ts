import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RequestComponent} from './request.component';
import {IonicModule} from '@ionic/angular';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [RequestComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
  ],
  exports: [
      RequestComponent
  ]
})
export class RequestModule { }
