import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  sendEncuesta(){}

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

}
