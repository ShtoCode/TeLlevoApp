import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionPgrChoferPageRoutingModule } from './notificacion-pgr-chofer-routing.module';

import { NotificacionPgrChoferPage } from './notificacion-pgr-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionPgrChoferPageRoutingModule
  ],
  declarations: [NotificacionPgrChoferPage]
})
export class NotificacionPgrChoferPageModule {}
