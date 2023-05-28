import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebhookFormPage } from './webhook-form.page';

const routes: Routes = [
  {
    path: ':webhook_id',
    component: WebhookFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebhookFormPageRoutingModule {}
