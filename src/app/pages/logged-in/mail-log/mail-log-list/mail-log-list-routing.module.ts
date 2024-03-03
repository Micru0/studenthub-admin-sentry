import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailLogListPage } from './mail-log-list.page';

const routes: Routes = [
  {
    path: '',
    component: MailLogListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailLogListPageRoutingModule {}
