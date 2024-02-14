import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrencyViewPageRoutingModule } from './currency-view-routing.module';

import { CurrencyViewPage } from './currency-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrencyViewPageRoutingModule
  ],
  declarations: [CurrencyViewPage]
})
export class CurrencyViewPageModule {}
