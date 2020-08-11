import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferFileDetailPage } from './transfer-file-detail.page';

const routes: Routes = [
  {
    path: ':transfer_file_id',
    component: TransferFileDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferFileDetailPageRoutingModule {}
