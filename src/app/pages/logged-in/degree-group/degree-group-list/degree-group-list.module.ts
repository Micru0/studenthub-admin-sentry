import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DegreeGroupListPageRoutingModule } from './degree-group-list-routing.module';

import { DegreeGroupListPage } from './degree-group-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    DegreeGroupListPageRoutingModule
  ],
  declarations: [DegreeGroupListPage]
})
export class DegreeGroupListPageModule {}
