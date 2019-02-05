import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModelEncuesta } from '../../Clases/modelEncuesta';
import { DatosLocal } from '../../Datos/datosLocal';
import { RespuestasService } from 'src/app/Servicios/Respuestas/respuestas.service';
import { IDatasLogin } from 'src/app/Clases/Interfaces/IDatasLogin';
import { IDatasEncuesta } from 'src/app/Clases/Interfaces/IDatasEncuesta';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, IDatasEncuesta {
  encuestasModel:ModelEncuesta[]=[];
  @ViewChild('Cargando') Cargando;

  constructor(private route: Router, private dataLocal:DatosLocal, private respuestasController:RespuestasService) { }

  ngOnInit() {
    this.respuestasController.consultarEncuestas(this);
  }

  successEncuesta(encuestas:ModelEncuesta[]){
    this.encuestasModel = encuestas;
    this.Cargando.nativeElement.hidden = true;
  }

  failEncuesta(){
    this.Cargando.nativeElement.hidden = true;
    console.log("ha ocurrido un error");
    alert("Ha ocurrido un error");
  }

  elegirEncuesta(encuesta:string, id:string){ 
    this.dataLocal.setEncuestaElegir(encuesta);
    this.dataLocal.setIdElegir(id);
  }

  goToContestar(){
    this.route.navigate(['/usuario/Contestar']);
  }

  goToRespuestas(){
    this.route.navigate(['/usuario/Respuestas']);
  }

}
