import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IDatasLogin } from 'src/app/Clases/Interfaces/IDatasLogin';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  private basePath = 'https://node-api-rest-example-iobjymmhel.now.sh/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  guardarPreguntas(json:string, listener:IDatasLogin) {
    this.http.post<any>(this.basePath+ 'encuesta', json, this.httpOptions).subscribe((result)=>{
      if(result.data == null){
        listener.failLogin();
      }else{
        listener.successLogin();
      }
    }, err=>{
      listener.failLogin();
    });
  }
}
