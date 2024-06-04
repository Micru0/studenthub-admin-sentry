import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DegreeListPageRoutingModule } from './degree-list-routing.module';

import { DegreeListPage } from './degree-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModalModule,
    DegreeListPageRoutingModule
  ],
  declarations: [DegreeListPage]
})
export class DegreeListPageModule {}
