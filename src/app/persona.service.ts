import { Injectable } from '@angular/core';
//importar librerias
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, observable } from 'rxjs';
import { PersonaI } from './models/persona.inteface';
import { map } from 'rxjs/operators';
import { AngularFireModule } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private personaCollection: AngularFirestoreCollection<PersonaI>;
  private personas: Observable<PersonaI[]>;

  constructor(db: AngularFirestore) {
    this.personaCollection = db.collection<PersonaI>('Persona');
    this.personas = this.personaCollection.snapshotChanges().pipe(
      map(
        actions => {
          return actions.map(a => {
            const id = a.payload.doc.id;
            const datos = a.payload.doc.data();
            return { id, ...datos };
          });
        }
      )
    );
  }
  //Metodos CRUD
  //metodo que repotrna todas las personas
  getPersonas() {
    return this.personas;
  }
  //metodo que buscar por la id
  getPersona(id: string) {
    return this.personaCollection.doc<PersonaI>(id).valueChanges();
  }
  //agregar una persona a la base de datos de firebase
  addPersona(persona: PersonaI) {
    return this.personaCollection.add(persona);
  }
  //remover una persona
  removePersona(id: string){
    return this.personaCollection.doc(id).delete();
  }
  //actualizar una persona
  updatePersona(nva_persona:PersonaI,id :string){
    return this.personaCollection.doc(id).update(nva_persona);
  }
}

