import { Component, OnInit } from '@angular/core';
/*librerias */
import { PersonaI } from 'src/app/models/persona.inteface';
import { PersonaService } from 'src/app/persona.service';

@Component({
  selector: 'app-inicio-pasajero',
  templateUrl: './inicio-pasajero.page.html',
  styleUrls: ['./inicio-pasajero.page.scss'],
})
export class InicioPasajeroPage implements OnInit {
  personas: PersonaI[];

  constructor(private personaServ: PersonaService) { }

  ngOnInit():void {
    this.personaServ.getPersonas().subscribe(
      resp=>{
        this.personas=resp;
      }
    );
  }

}
