import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDatasLogin } from 'src/app/Clases/Interfaces/IDatasLogin';
import { IDatasEncuesta } from 'src/app/Clases/Interfaces/IDatasEncuesta';
import { IDatasRespuestas } from 'src/app/Clases/Interfaces/IDatasRespuestas';
import { IDatasGetRespuestas } from 'src/app/Clases/Interfaces/IDatasGetRespuestas';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {
  private basePath = 'https://node-api-rest-example-iobjymmhel.now.sh/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  consultarEncuestas(listener:IDatasEncuesta) {
    this.http.get<any>(this.basePath+ 'encuesta/consultar/todo', this.httpOptions).subscribe((result)=>{
      if(result.data == null){
        listener.failEncuesta();
      }else{
        listener.successEncuesta(result.data);
      }
    }, err=>{
      listener.failEncuesta();
    });
  }

  respuestaEncuestas(json:string, listener:IDatasLogin) {
    console.log(json);
    this.http.post<any>(this.basePath+ 'encuesta/respuestas', json, this.httpOptions).subscribe((result)=>{
      console.log(result);
      if(result.data == null){
        listener.failLogin();
      }else{
        listener.successLogin();
      }
    }, err=>{
      listener.failLogin();
    });
  }

  getPreguntas(id:string, listener:IDatasRespuestas) {
    this.http.get<any>(this.basePath+ 'encuesta/consultar/'+id, this.httpOptions).subscribe((result)=>{
      if(result.data == null){
        listener.failRespuestas();
      }else{
        listener.successRespuestas(result.data.preguntas);
      }
    }, err=>{
      listener.failRespuestas();
    });
  }

  getRespuestas(id:string, listener:IDatasGetRespuestas) {
    this.http.get<any>(this.basePath+ 'encuesta/consultar/respuestas/'+id, this.httpOptions).subscribe((result)=>{
      if(result.data == null){
        listener.errorRespuestas();
      }else{
        listener.successRespuestas(result.data[result.data.length-1].respuestas);
      }
    }, err=>{
      listener.errorRespuestas();
    });
  }
}
