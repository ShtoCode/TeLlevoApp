import { Component, OnInit } from '@angular/core';



import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/api.service';

//importar para ver los datos de la persona
import { PasajeroService } from 'src/app/pasajero.service';
import { PasajeroI } from 'src/app/models/Pasajero.inteface';
//servicio del marcador
import { MarkerI } from 'src/app/models/MarkerI.interface';
/* Librerias de geolocalizacion*/
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Condition } from 'selenium-webdriver';

//encargado de almacenar info del mapa
declare var google;
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  //para recuperar la persona
  pasajeros: PasajeroI[];

  lat: number = -33.59786283845544;
  lng: number = -70.57877682275354;

  //calcular la ruta optima entre 2 puntos
  direccionService = new google.maps.DirectionsService();
  //perimte dibujar la ruta en el mapa
  direccionDisplay = new google.maps.DirectionsRenderer();

  //ejemplo desde tu casa hasta la sede
  //punto de inicio de la ruta -33.39230581482144, -70.57305941725382
  origen = { lat: -33.39230581482144, lng: -70.57305941725382 }
  //putno de termino de la ruta
  destino = { lat: -33.59786283845544, lng: -70.57877682275354 }

  map = null;

  //variable que recupera la dirrecion escrita escrita por usuario
  dire: string;

  pasajero: PasajeroI = {
    Apellido: '',
    Nombre: '',
    Celular: '',
  };
  pasajeroId = null;

  constructor(
    private pasajeroSERV: PasajeroService,
    private geoloc: Geolocation,
    private nav: NavController,
    private loadingCrtl: LoadingController,
    private route: ActivatedRoute,
    private api: APIService
  ) { }



  ngOnInit() {
    this.cargarMapa();
    this.pasajeroId = this.route.snapshot.params['id'];
    //para recuperar persona

  }

  Direccion() {
    console.log(this.dire);
    this.api.getDireccion(this.dire).subscribe((data) => {
      console.log(data);
      }, (e) => {
      console.log(e);
      }
    );
  }

  async cargarMapa() {
    const carga = await this.loadingCrtl.create({
      message: 'Cargando mapa...'
    })
    await carga.present();
    const ubicacionactual = await this.geoloc.getCurrentPosition();
    const mapaHtml: HTMLElement = document.getElementById("map");
    const ubicacion = {
      lat: ubicacionactual.coords.latitude,
      lng: ubicacionactual.coords.longitude
    };
    this.map = new google.maps.Map(mapaHtml, {
      center: ubicacion,
      zoom: 18
    });
    this.direccionDisplay.setMap(this.map);
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      carga.dismiss();
      //this.AgregarMarcador(ubicacionactual.coords.latitude, ubicacionactual.coords.longitude, 'sede')
      //this.dibujarMarcador;
      this.calcularRuta();
    });
  }
  //agregar marcadores
  public AgregarMarcador(lat: number, lng: number, titulo: string) {
    const marcador = new google.maps.Marker({
      position: { lat, lng },
      zoom: 20,
      map: this.map,
      title: titulo
    });

    
  
  }
  //agregar varios marcadores
  public dibujarMarcador() {
    this.listaMarcadores.forEach(m => {
    });
  }

  //metodo calcular ruta
  private calcularRuta() {
    this.direccionService.route({
      origin: this.origen,
      destination: this.destino,
      waypoints: this.wayPoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        this.direccionDisplay.setDirections(response);
        console.log('dibujo');
      } else {
        console.log("error al calcular la ruta " + status);
      }
    }
    );
  }

  //lista de marcadores
  listaMarcadores: MarkerI[] = [
    {
      position:{
      lat:-33.5763103,
      lng: -70.56029649999999
    },
    title:'Mi casa'
  },
  {
    position:{
      lat:-33.60955,
      lng:  -70.57590999999999
    },
    title:'plaza puente'
  }
  ]
  wayPoints: WayPoint[] = [
    {
      location: {
        lat: -33.5763103,
        lng: -70.56029649999999
      },
      stopover: true
    },
    {
      location: {
        lat: -33.60955,
        lng: -70.57590999999999
      },
      stopover: true
    },
  ]

  async cargarPersona() {
    const loading = await this.loadingCrtl.create({
      message: 'cargando...'
    });
    await loading.present();
    this.pasajeroSERV.getPasajero(this.pasajeroId).subscribe(resp => {
      loading.dismiss();
      this.pasajero = resp;
      console.log(resp);
    });
  }
}

  //crear metodo que permita crear ruta entre dos puntos
  interface WayPoint {
  location: {
    lat: number,
    lng: Number
  },
  stopover: boolean
  }