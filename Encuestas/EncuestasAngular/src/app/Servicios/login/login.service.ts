import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IDatasLogin } from 'src/app/Clases/Interfaces/IDatasLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private basePath = 'https://node-api-rest-example-iobjymmhel.now.sh/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getUsuarios(username:string, password:string, listener:IDatasLogin) {
    this.http.post<any>(this.basePath+ 'usuarios/login', {username:username, password:password}, this.httpOptions).subscribe((result)=>{
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
