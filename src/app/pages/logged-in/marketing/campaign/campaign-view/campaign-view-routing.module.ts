import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignViewPage } from './campaign-view.page';

const routes: Routes = [
  {
    path: ':id',
    component: CampaignViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignViewPageRoutingModule {}
