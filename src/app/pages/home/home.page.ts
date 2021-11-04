import { Component } from '@angular/core';

import { APIService } from 'src/app/api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private apiServ: APIService) { }
/*
  recuperar() {
    this.apiServ.getPosts().subscribe(
      (resp) => {
        console.log(resp);
      }, (error) => {
        console.log(error);
      }
    )
  }

  recuperarId(id: any) {
    this.apiServ.getPost(id).subscribe(
      (resp) => {
        console.log(resp);
      }, (error) => {
        console.log(error);
      }
    );
  }

  recuperaDolar() {
    this.apiServ.getDolar().subscribe(
      (resp) => {
        console.log(resp.serie[0].valor);
      }, (error) => {
        console.log(error);
      }
    );
  }

  almacenarPost() {
    var datos = {
      userId: 1,
      id: 101,
      title: 'hola mundo',
      body: 'descripcion'
    };
    this.apiServ.createPost(datos).subscribe(
      (success) => {
        console.log(success);
      }, (error) => {
        console.log(error);
      }
    );
  }

  actualizarPost() {
    var datos = {
      userId: 1,
      id: 100,
      title: 'hola mundo',
      body: 'descripcion'
    };
    this.apiServ.updatePost(100,datos).subscribe(
      (success) => {
        console.log(success);
      }, (error) => {
        console.log(error);
      }
    );
  }

  elminarPost(){
    this.apiServ.deletePost(50).subscribe(
      (success)=>{
        console.log(success);
      }, (error)=>{
        console.log(error);
      }
    );
  }
  */
}
