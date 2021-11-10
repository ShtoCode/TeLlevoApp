import { Injectable } from '@angular/core';
/* LIBRERIAS */
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ViajeI } from './models/Viaje.interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  private viajeCollection : AngularFirestoreCollection<ViajeI>;
  private viajes : Observable<ViajeI[]>;

  constructor( db : AngularFirestore ) {
    this.viajeCollection=db.collection<ViajeI>('viaje');
    this.viajes=this.viajeCollection.snapshotChanges().pipe(
      map(
        actions =>{
          return actions.map(a=>{
            const id=a.payload.doc.id;
            const datos= a.payload.doc.data();
            return {id, ...datos};
          });
        }
      )
    );
   }
  //METODOS CRUD
//RETORNAR VIAJES
getViajes(){
  return this.viajes
}
//RETORNAR VIAJE POR ID
getViaje(id:string){
  return this.viajeCollection.doc<ViajeI>(id).valueChanges();
}
//AGREGAR VIAJE A LA BASE DE DATOS
addViaje(viaje:ViajeI){
  return this.viajeCollection.add(viaje);
}

}
