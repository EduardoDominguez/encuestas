import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelRespuestas } from '../../Clases/modelRespuestas';
import { ModelEncuesta } from '../../Clases/modelEncuesta';
import { ModelQuestions } from '../../Clases/modelQuestions';
import { DatosLocal } from '../../Datos/datosLocal';
import { RespuestasService } from 'src/app/Servicios/Respuestas/respuestas.service';
import { PreguntasService } from 'src/app/Servicios/Preguntas/preguntas.service';
import { IDatasLogin } from 'src/app/Clases/Interfaces/IDatasLogin';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit, IDatasLogin {
  encuestasModel:ModelEncuesta[]=[];
  preguntasModel:ModelQuestions[]=[];
  encuesta:string="0";
  pregunta:string="0";

  modelRespuestas:ModelRespuestas[]=[{respuesta:""}];

  constructor(private route: Router, private dataLocal:DatosLocal, private preguntasController:PreguntasService) {
  }

  ngOnInit() {
    this.encuestasModel=this.dataLocal.getEncuesta();
    if(this.encuestasModel != null && this.encuestasModel != undefined && this.encuestasModel.length > 0){
      this.preguntasModel= this.encuestasModel[0].preguntas;
    }
  }

  changeEncuesta(){
    let encuest:ModelEncuesta = this.encuestasModel.find(element => element.encuesta == this.encuesta);
    if(encuest!=null && encuest != undefined){
      this.preguntasModel = encuest.preguntas;
    }
  }

  saveRespuestas(){
    let preg:ModelQuestions = this.preguntasModel.find(element => element.pregunta === this.pregunta);
    let pregEdit=preg;
    pregEdit.respuestas=this.modelRespuestas;
    this.preguntasModel[this.preguntasModel.indexOf(preg)]=pregEdit;
    let encu:ModelEncuesta = this.encuestasModel.find(element => element.encuesta === this.encuesta);
    let encuEdit=encu;
    encuEdit.preguntas=this.preguntasModel;
    this.encuestasModel[this.encuestasModel.indexOf(encu)]=encuEdit;
    this.dataLocal.setEncuesta(this.encuestasModel);
  }

  goToEncuesta(){
    this.route.navigate(['/administrador/AltaEncuesta']);
  }
  goToPreguntas(){
    this.route.navigate(['/administrador/AltaPreguntas']);
  }
  goToRespuestas(){
    this.route.navigate(['/administrador/AltaRespuestas']);
  }

  goToUser(){
    this.route.navigate(['/usuario/Elegir']);
  }

  addRespuesta(){
    this.modelRespuestas.push({respuesta:""});
  }

  sendEncuesta(){
    this.preguntasController.guardarPreguntas(JSON.stringify(this.dataLocal.getEncuesta()[this.dataLocal.getEncuesta().length-1]), this);
  }

  successLogin(){
    console.log("se ha guardado");
    alert("Se ha guardado la respuesta");
    this.route.navigate(['/administrador/Crear']);
  }

  failLogin(){
    console.log("error");
    alert("Error al guardar");
  }

  removeRespuesta(){
    if(this.modelRespuestas.length>1){
      this.modelRespuestas.pop();
    }
    
  }

}
