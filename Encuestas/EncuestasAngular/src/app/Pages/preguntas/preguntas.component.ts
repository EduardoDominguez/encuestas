import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelQuestions } from '../../Clases/modelQuestions';
import { ModelEncuesta } from '../../Clases/modelEncuesta';
import { DatosLocal } from '../../Datos/datosLocal';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  modelQuestions:ModelQuestions[]=[{pregunta:"", numeroRespuestas:0, tipoPregunta:0, respuestas:[], respuesta:""}];
  encuestasModel:ModelEncuesta[]=[];
  encuesta:string="0";

  constructor(private route: Router, private datas:DatosLocal) {
    this.encuestasModel = datas.getEncuesta();
  }

  saveEncuesta(){
    let encu:ModelEncuesta = this.encuestasModel.find(element => element.encuesta == this.encuesta);
    let encuEdit=encu;
    encuEdit.preguntas=this.modelQuestions;
    this.encuestasModel[this.encuestasModel.indexOf(encu)]=encuEdit;
    this.datas.setEncuesta(this.encuestasModel);
  }

  sendEncuesta(){}

  ngOnInit() {
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

  addQuestion(){
    this.modelQuestions.push({pregunta:"", numeroRespuestas:0, tipoPregunta:0, respuestas:[], respuesta:""});
  }

  removeQuestion(){
    if(this.modelQuestions.length>1){
      this.modelQuestions.pop();
    }
    
  }

}
