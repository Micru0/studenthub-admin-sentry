import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportSalaryFormPage } from './import-salary-form.page';

const routes: Routes = [
  {
    path: '',
    component: ImportSalaryFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportSalaryFormPageRoutingModule {}
