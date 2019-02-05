import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { CrearComponent } from './Pages/crear/crear.component';
import { EncuestaComponent } from './Pages/encuesta/encuesta.component';
import { PreguntasComponent } from './Pages/preguntas/preguntas.component';
import { FormsModule } from '@angular/forms';
import { RespuestasComponent } from './Pages/respuestas/respuestas.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { ContestarComponent } from './Pages/contestar/contestar.component';
import { RespondidoComponent } from './Pages/respondido/respondido.component';
import { DatosLocal } from './Datos/datosLocal';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearComponent,
    EncuestaComponent,
    PreguntasComponent,
    RespuestasComponent,
    UsuarioComponent,
    ContestarComponent,
    RespondidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatosLocal],
  bootstrap: [AppComponent]
})
export class AppModule { }
