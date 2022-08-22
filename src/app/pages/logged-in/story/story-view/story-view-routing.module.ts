import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoryViewPage } from './story-view.page';

const routes: Routes = [
  {
    path: ':story_uuid',
    component: StoryViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoryViewPageRoutingModule {}
