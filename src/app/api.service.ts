import { Injectable } from '@angular/core';
/*importar librerias
Necesarias para que las API funcionen
*/ 
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { retry,catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  httpOption = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'**'
    })
  }
  constructor( private http: HttpClient) { }
  
  apiURL='https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCwYek7uo-LI6LT9qYWLpfnpELnAXrPPLY&address='
  direccion='http://jsonplaceholder.typicode.com/posts'

  //buscar direccion
  getDireccion(direccion:string):Observable<any>{
    return this.http.get(this.apiURL+direccion).pipe(retry(3));
  }

//Para obtener las apis desde la url establecida
//recuperar todos los datos
  getPosts(): Observable<any>{
    return this.http.get(this.direccion).pipe(retry(3));
  }
//recuperar API por medio de la ID
  getPost(id) : Observable<any>{
    return this.http.get(this.direccion+'/'+id).pipe(retry(3));
  }


//permite almacenar datos
  createPost(post):Observable<any>{
    return this.http.post(this.direccion, post, this.httpOption).pipe(retry(3));
  }
//actualizar los datos
  updatePost(id,post):Observable<any>{
    return this.http.put(this.direccion+'/'+id,post, this.httpOption).pipe(retry(3));
  }
//eliminar datos
 deletePost(id):Observable<any>{
   return this.http.delete(this.direccion+'/'+id, this.httpOption).pipe(retry(3));
 }

//recuperar el valor del dolar desde mindicador.cl
  getDolar(): Observable<any>{
    return this.http.get('https://mindicador.cl/api/dolar').pipe(retry(3));
  }
}
