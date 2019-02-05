import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Servicios/login/login.service';
import { IDatasLogin } from 'src/app/Clases/Interfaces/IDatasLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, IDatasLogin {
  usuario:string="";
  contrasena:string="";

  constructor(private loginPresenter: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.loginPresenter.getUsuarios(this.usuario, this.contrasena, this);
  }

  successLogin(){
    this.router.navigate(['/administrador/Crear']);
  }
  
  failLogin(){
    console.log("Error");
    alert("Error en logueo");
  }

}
