import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebhookTestPage } from './webhook-test.page';

const routes: Routes = [
  {
    path: ':webhook_id',
    component: WebhookTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebhookTestPageRoutingModule {}
