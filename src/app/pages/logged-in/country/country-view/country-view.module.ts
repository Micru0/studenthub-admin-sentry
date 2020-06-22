import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryViewPageRoutingModule } from './country-view-routing.module';

import { CountryViewPage } from './country-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountryViewPageRoutingModule
  ],
  declarations: [CountryViewPage]
})
export class CountryViewPageModule {}
