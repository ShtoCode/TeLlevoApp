import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeSolicitadoDPageRoutingModule } from './viaje-solicitado-d-routing.module';

import { ViajeSolicitadoDPage } from './viaje-solicitado-d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeSolicitadoDPageRoutingModule
  ],
  declarations: [ViajeSolicitadoDPage]
})
export class ViajeSolicitadoDPageModule {}
