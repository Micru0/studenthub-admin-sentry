import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailLogViewPage } from './mail-log-view.page';

const routes: Routes = [
  {
    path: ':mail_uuid',
    component: MailLogViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailLogViewPageRoutingModule {}
