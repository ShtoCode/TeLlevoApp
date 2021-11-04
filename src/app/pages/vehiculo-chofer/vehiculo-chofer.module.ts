import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculoChoferPageRoutingModule } from './vehiculo-chofer-routing.module';

import { VehiculoChoferPage } from './vehiculo-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiculoChoferPageRoutingModule
  ],
  declarations: [VehiculoChoferPage]
})
export class VehiculoChoferPageModule {}
