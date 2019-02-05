import { Component, OnInit } from '@angular/core';
import { ModelQuestions } from '../../Clases/modelQuestions';
import { DatosLocal } from '../../Datos/datosLocal';
import { ModelResponder } from '../../Clases/modelResponder';
import { RespuestasService } from 'src/app/Servicios/Respuestas/respuestas.service';
import { IDatasLogin } from 'src/app/Clases/Interfaces/IDatasLogin';
import { IDatasRespuestas } from 'src/app/Clases/Interfaces/IDatasRespuestas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contestar',
  templateUrl: './contestar.component.html',
  styleUrls: ['./contestar.component.css']
})
export class ContestarComponent implements OnInit, IDatasLogin, IDatasRespuestas {
  preguntasModel:ModelQuestions[]=[];
  responder:ModelResponder= new ModelResponder();

  constructor(private dataLocal:DatosLocal, private encuestrasController:RespuestasService, private route: Router) { }

  ngOnInit() {
    this.encuestrasController.getPreguntas(this.dataLocal.getIdElegir(), this);
  }

  successLogin(){
    console.log("Se ha guardado");
    alert("Se ha guardado");
    this.route.navigate(['/administrador/Crear']);
  }

  failLogin(){
    console.log("error");
    alert("Error al contestar");
  }

  failRespuestas(){
    console.log("error");
    alert("Error al contestar");
  }

  successRespuestas(respuestas:ModelQuestions[]){
    this.preguntasModel = respuestas;
  }

  contestar(){
    this.responder.encuesta = this.dataLocal.getEncuestaElegir();
    this.responder._id = this.dataLocal.getIdElegir();
    this.responder.respuestas=[];
    this.preguntasModel.forEach(element=>{
      this.responder.respuestas.push({pregunta:element.pregunta, respuesta: element.respuesta});
    });
    let resp:ModelResponder[]=this.dataLocal.getRespuesta();
    if(resp == null || resp ==undefined){
      resp= [];
      resp.push(this.responder);
      this.encuestrasController.respuestaEncuestas(JSON.stringify(resp[resp.length-1]), this);
      //this.dataLocal.setRespuesta(resp);
    }else{
      let respItem = resp.find(element => element.encuesta == this.dataLocal.getEncuestaElegir());
      if(respItem == null || respItem ==undefined){
        resp.push(this.responder);
        this.encuestrasController.respuestaEncuestas(JSON.stringify(resp[resp.length-1]), this);
        //this.dataLocal.setRespuesta(resp);
      }else{
        let respAux=respItem;
        respItem.respuestas=this.responder.respuestas;
        resp[resp.indexOf(respAux)]=respItem;
        this.encuestrasController.respuestaEncuestas(JSON.stringify(resp[resp.length-1]), this);
        //this.dataLocal.setRespuesta(resp);
      }
    }
  }

}
