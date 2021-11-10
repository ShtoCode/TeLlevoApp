import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { PasajeroI } from './models/Pasajero.inteface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {

  private pasajeroCollection : AngularFirestoreCollection<PasajeroI>;
  private pasajeros : Observable<PasajeroI[]>;
  constructor( db : AngularFirestore ) {
    this.pasajeroCollection = db.collection<PasajeroI>('pasajero');
    this.pasajeros = this.pasajeroCollection.snapshotChanges().pipe(
      map(
        actions =>{
          return actions.map(a=>{
            const id=a.payload.doc.id;
            const datos = a.payload.doc.data();
            return {id, ...datos};
          });
        }
      )
    );
   }


  //Metodos CRUD
  
//METODO QUE RETORNA TOD@S L@S PASAJEROS
getPasajeros(){
  return this.pasajeros;
}

//METODO QUE BUSCARA POR ID
getPasajero(id:string){
  return this.pasajeroCollection.doc<PasajeroI>(id).valueChanges();
}

//METODO AGREGAR UN PASAJERO A LA BASE DE DATOS DE FIREBASE
addPasajero(pasajero: PasajeroI){
  return this.pasajeroCollection.add(pasajero);

}
}