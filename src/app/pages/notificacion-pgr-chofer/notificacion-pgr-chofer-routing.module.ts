import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionPgrChoferPage } from './notificacion-pgr-chofer.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionPgrChoferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionPgrChoferPageRoutingModule {}
