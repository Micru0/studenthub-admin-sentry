import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryFormPage } from './country-form.page';

const routes: Routes = [
  {
    path: ':country_id',
    component: CountryFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryFormPageRoutingModule {}
