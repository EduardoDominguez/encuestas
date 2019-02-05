import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearComponent } from './Pages/crear/crear.component';
import { EncuestaComponent } from './Pages/encuesta/encuesta.component';
import { PreguntasComponent } from './Pages/preguntas/preguntas.component';
import { RespuestasComponent } from './Pages/respuestas/respuestas.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { ContestarComponent } from './Pages/contestar/contestar.component';
import { RespondidoComponent } from './Pages/respondido/respondido.component';
import { LoginComponent } from './Pages/login/login.component';

const routes: Routes = [
  { path: 'administrador/Login', component: LoginComponent },
  { path: 'administrador/Crear', component: CrearComponent },
  { path: '',redirectTo: 'administrador/Login', pathMatch: 'full' },
  { path: 'administrador/AltaEncuesta', component: EncuestaComponent },
  { path: 'administrador/AltaPreguntas', component: PreguntasComponent },
  { path: 'administrador/AltaRespuestas', component: RespuestasComponent },
  { path: 'usuario/Elegir', component: UsuarioComponent },
  { path: 'usuario/Contestar', component: ContestarComponent },
  { path: 'usuario/Respuestas', component: RespondidoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
