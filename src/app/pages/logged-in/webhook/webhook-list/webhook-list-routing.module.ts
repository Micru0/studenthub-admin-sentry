import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebhookListPage } from './webhook-list.page';

const routes: Routes = [
  {
    path: '',
    component: WebhookListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebhookListPageRoutingModule {}
