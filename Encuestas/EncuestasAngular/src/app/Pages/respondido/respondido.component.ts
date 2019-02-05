import { Component, OnInit } from '@angular/core';
import { DatosLocal } from '../../Datos/datosLocal';
import { ModelRespondido } from '../../Clases/modelRespondido';
import { RespuestasService } from 'src/app/Servicios/Respuestas/respuestas.service';
import { IDatasGetRespuestas } from 'src/app/Clases/Interfaces/IDatasGetRespuestas';
import { ModelRespuestas } from 'src/app/Clases/modelRespuestas';

@Component({
  selector: 'app-respondido',
  templateUrl: './respondido.component.html',
  styleUrls: ['./respondido.component.css']
})
export class RespondidoComponent implements OnInit, IDatasGetRespuestas {
  respuestasModel:ModelRespondido[];

  constructor(private dataLocal:DatosLocal, private respuestasController:RespuestasService) {

  }

  ngOnInit() {
    this.respuestasController.getRespuestas(this.dataLocal.getIdElegir(), this);
    //this.respuestasModel = this.dataLocal.getRespuesta().find(element=> element.encuesta == this.dataLocal.getEncuestaElegir()).respuestas;
    
  }

  successRespuestas(resp:ModelRespondido[]){
    this.respuestasModel=resp;
  }

  errorRespuestas(){
    console.log("error");
    alert("Error en respuestas");
  }
  

}
