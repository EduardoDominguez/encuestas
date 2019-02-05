import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelEncuesta } from '../../Clases/modelEncuesta';
import { DatosLocal } from '../../Datos/datosLocal';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  encuesta:ModelEncuesta = new ModelEncuesta();
  nombre:string="";
  descripcion:string="";

  constructor(private route: Router, private data:DatosLocal) { }

  ngOnInit() {
  }

  sendEncuesta(){}

  goToEncuesta(){
    this.route.navigate(['/administrador/AltaEncuesta']);
  }
  goToPreguntas(){
    this.route.navigate(['/administrador/AltaPreguntas']);
  }
  goToRespuestas(){
    this.route.navigate(['/administrador/AltaRespuestas']);
  }

  saveEncuesta(){
    this.encuesta.descripcion=this.descripcion;
    this.encuesta.encuesta=this.nombre;
    let encuestas:ModelEncuesta[] = this.data.getEncuesta();
    if(encuestas != undefined || encuestas != null){
      encuestas.push(this.encuesta);
    }else{
      encuestas=[];
      encuestas.push(this.encuesta);
    }
    this.data.setEncuesta(encuestas);
  }

  goToUser(){
    this.route.navigate(['/usuario/Elegir']);
  }

}
