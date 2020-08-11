import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferFileListPage } from './transfer-file-list.page';

const routes: Routes = [
  {
    path: '',
    component: TransferFileListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferFileListPageRoutingModule {}
