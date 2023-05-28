import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebhookViewPage } from './webhook-view.page';

const routes: Routes = [
  {
    path: ':webhook_id',
    component: WebhookViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebhookViewPageRoutingModule {}
