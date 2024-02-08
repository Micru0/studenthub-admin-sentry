import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockedIpFormPage } from './blocked-ip-form.page';

const routes: Routes = [
  {
    path: '',
    component: BlockedIpFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockedIpFormPageRoutingModule {}
