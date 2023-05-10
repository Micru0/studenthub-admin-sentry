import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagViewPage } from './tag-view.page';

const routes: Routes = [
  {
    path: ':tag_id',
    component: TagViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagViewPageRoutingModule {}
