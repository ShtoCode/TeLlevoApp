import { Component, OnInit } from '@angular/core';
import { ViajeI } from 'src/app/models/Viaje.interface';
import { ViajeService } from 'src/app/viaje.service';

@Component({
  selector: 'app-inicio-chofer',
  templateUrl: './inicio-chofer.page.html',
  styleUrls: ['./inicio-chofer.page.scss'],
})
export class InicioChoferPage implements OnInit {

  viajes: ViajeI[];

  constructor(private viajeServ: ViajeService) { }

  ngOnInit():void{
    this.viajeServ.getViajes().subscribe( resp=>{
      this.viajes = resp;
    });
  }

}
