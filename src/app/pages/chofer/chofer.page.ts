import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/api.service';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

/* LIBRERIAS */
import { ViajeI } from 'src/app/models/Viaje.interface';
import { ViajeService } from 'src/app/viaje.service';

//import para la geolocalizacion
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Button, Condition } from 'selenium-webdriver';

import { MarkerI } from 'src/app/models/MarkerI.interface';
import { messaging } from 'firebase';
import { isNgTemplate } from '@angular/compiler';

console.log('hola')

declare var google;
@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
})
export class ChoferPage implements OnInit {
  viaje: ViajeI={
    dirInicial:'Duoc UC: Sede Puente Alto - Avenida San Carlos, Puente Alto',
    dirFinal: '',
    horaPartida: '',
    tarifa: 0
  }
  

  
  lat: number = -33.59786283845544;
  lng: number = -70.57877682275354;

  //calcular la ruta optima entre 2 puntos
  direccionService = new google.maps.DirectionsService();
  //perimte dibujar la ruta en el mapa
  direccionDisplay = new google.maps.DirectionsRenderer();

  //punto de inicio de la ruta -33.39230581482144, -70.57305941725382
  origen = { lat: -33.59786283845544, lng: -70.57877682275354 }
  //variable que recupera la dirrecion escrita escrita por usuario / punto final
  dire: string;

  map = null;

  //variable para almacenar direccion que entrega google
  direccion_go: string;

  latitud: number;
  longitud: number;
  //varialbe numeradora de puntos de parada
  puntos:number=0;

  constructor(
    private geoloc: Geolocation,
    private loadingCrtl: LoadingController,
    private api: APIService,
    private alertCrtl: AlertController,
    private viajeServ: ViajeService,
    private nav: NavController,
    private loading: LoadingController
  ) { }


  //Agregar viaje
  async addViaje(){
    const cargar = await this.loading.create({
      message:'Guardando viaje...'
    });
    await cargar.present();
    this.viajeServ.addViaje(this.viaje).then(()=>{
      cargar.dismiss();
      this.nav.navigateForward("/inicio-chofer")
    });
  }

  ngOnInit() {
    this.cargarMapa();
  }

  alertaProga() {
    alert("El viaje a sido programado correctamente");
  }

  Direccion() {
    console.log(this.dire);
    this.api.getDireccion(this.dire).subscribe((data) => {
      console.log(data);
      console.log(data.results[0].formatted_address);
      this.direccion_go = data.results[0].formatted_address;
      console.log(data.results[0].geometry.location);
      this.latitud = data.results[0].geometry.location.lat;
      this.Pregunta();
      this.longitud = data.results[0].geometry.location.lng;
    }, (e) => {
      console.log(e);
    }
    );
  }

  async Pregunta() {
    const alert = await this.alertCrtl.create({
      header: 'Agregar ruta',
      message: '¿Desea agregar la ruta <strong>' + this.direccion_go + '</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log("Cancelo");
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log("Acepto");
            this.agregarPunto();
          }
        }
      ]
    });
    await alert.present();
  }

  agregarPunto() {
    const wp = {
      location: {
        lat: this.latitud,
        lng: this.longitud
      }, stopover: true
    };
    this.puntos++;
    const wd={
      numero:this.puntos,
      ubicacion:this.direccion_go,
      lat:this.latitud,
      lng:this.longitud
    }
    this.WayListaDirecciones.push(wd)
    this.wayPoints.push(wp);
    this.calcularRuta();
  }

  async Eliminar(punto:any){
    const alert =await this.alertCrtl.create({
      header: 'Eliminar punto',
      message: '¿Desea eliminar el punto'+punto.ubicacion+'?',
      buttons:[
        {
          text:"Cancelar",
          handler:()=>{

          }
        },
        {
          text:"Aceptar",
          handler:()=>{
            this.quitarPunto(punto);
          }
        }
      ]
    })
    await alert.present();
  }

  quitarPunto(punto:any){
    const wpTemp: WayPoint[]=[];
    this.wayPoints.forEach(item=>{
      if(item.location.lat==punto.lat && item.location.lng==punto.lng ){

      }else{
        wpTemp.push(item)
      }
    });
    this.wayPoints=wpTemp;

    const wdTemp: WayDirecciones[]=[];
    this.WayListaDirecciones.forEach(item => {
      if(item.numero != punto.numero){
        wdTemp.push(punto);
      }
    });
    this.WayListaDirecciones=wdTemp;
    this.calcularRuta();
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

  public AgregarMarcador(lat: number, lng: number, titulo: string) {
    const marcador = new google.maps.Marker({
      position: { lat, lng },
      zoom: 20,
      map: this.map,
      title: titulo
    });
  }

  public dibujarMarcador() {
    this.listaMarcadores.forEach(m => {
    });
  }

  private calcularRuta() {
    this.direccionService.route({
      origin: this.origen,
      destination: this.dire,
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

  listaMarcadores: MarkerI[] = [
    
  ]
  wayPoints: WayPoint[] = [];
  WayListaDirecciones: WayDirecciones[]=[];
}

interface WayPoint {
  location: {
    lat: number,
    lng: Number
  },
  stopover: boolean
}
//crear un objeto donde almacene la direccion y su numero de putno
interface WayDirecciones{
  numero:number,
  ubicacion:string,
  lat:number,
  lng:number

}