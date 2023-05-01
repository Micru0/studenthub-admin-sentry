import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardQuicksPage } from './dashboard-quicks.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardQuicksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardQuicksRoutingModule {}
