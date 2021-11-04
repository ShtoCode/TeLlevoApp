import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoDisponiblePageRoutingModule } from './auto-disponible-routing.module';

import { AutoDisponiblePage } from './auto-disponible.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoDisponiblePageRoutingModule
  ],
  declarations: [AutoDisponiblePage]
})
export class AutoDisponiblePageModule {}
