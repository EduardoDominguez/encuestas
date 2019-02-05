import { ModelEncuesta } from "../Clases/modelEncuesta";
import { Injectable } from "@angular/core";
import { ModelResponder } from "../Clases/modelResponder";

@Injectable()
export class DatosLocal{
    keyEncuesta:string="KEY_ENCUESTA";
    keyRespuesta:string="KEY_RESPUESTA";
    encuestas:ModelEncuesta[];
    respuestas:ModelResponder[];
    encuesta:string="";
    id:string="";

    setEncuestaElegir(encuesta:string){
        this.encuesta = encuesta;
    }

    getEncuestaElegir(){
        return this.encuesta;
    }

    setIdElegir(encuesta:string){
        this.encuesta = encuesta;
    }

    getIdElegir(){
        return this.encuesta;
    }

    setRespuesta(respuestas:ModelResponder[]){
        this.respuestas = respuestas;
        localStorage.setItem(this.keyRespuesta, JSON.stringify(this.respuestas));
    }

    getRespuesta(){
        this.respuestas = JSON.parse(localStorage.getItem(this.keyRespuesta));
        this.setRespuesta(this.respuestas);
        return this.respuestas;
    }

    setEncuesta(encuestas:ModelEncuesta[]){
        this.encuestas = encuestas;
        localStorage.setItem(this.keyEncuesta, JSON.stringify(this.encuestas));
    }

    getEncuesta(){
        this.encuestas = JSON.parse(localStorage.getItem(this.keyEncuesta));
        this.setEncuesta(this.encuestas);
        return this.encuestas;
    }


}