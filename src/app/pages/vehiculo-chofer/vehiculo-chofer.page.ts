import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehiculo-chofer',
  templateUrl: './vehiculo-chofer.page.html',
  styleUrls: ['./vehiculo-chofer.page.scss'],
})
export class VehiculoChoferPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  alertaGuardado(){
    alert("El vehiculo se guardo correctamente");
  }
}
