import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoDisponiblePage } from './auto-disponible.page';

const routes: Routes = [
  {
    path: '',
    component: AutoDisponiblePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoDisponiblePageRoutingModule {}
