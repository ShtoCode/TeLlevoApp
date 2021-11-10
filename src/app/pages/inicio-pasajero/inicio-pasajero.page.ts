import { Component, OnInit } from '@angular/core';
/*librerias */
import { PasajeroI } from 'src/app/models/Pasajero.inteface';
import { PasajeroService } from 'src/app/pasajero.service';

@Component({
  selector: 'app-inicio-pasajero',
  templateUrl: './inicio-pasajero.page.html',
  styleUrls: ['./inicio-pasajero.page.scss'],
})
export class InicioPasajeroPage implements OnInit {
  pasajeros: PasajeroI[];

  constructor(private pasajeroSERV: PasajeroService) { }

  ngOnInit():void {
    this.pasajeroSERV.getPasajeros().subscribe(
      resp=>{
        this.pasajeros=resp;
      }
    );
  }

}
