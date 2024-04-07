import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignListPage } from './campaign-list.page';

const routes: Routes = [
  {
    path: '',
    component: CampaignListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignListPageRoutingModule {}
