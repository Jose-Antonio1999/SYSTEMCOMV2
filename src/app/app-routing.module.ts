import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComunicadoComponent } from './comunicado/panel-comunicado/panel-comunicado.component';
import { RegistroEstudianteComponent } from './estudiante/registro-estudiante/registro-estudiante.component';
import { ListaPersonalComponent } from './personal/lista-personal/lista-personal.component';
import { PanelPersonalComponent } from './personal/panel-personal/panel-personal.component';
import { PanelEstudianteComponent } from './estudiante/panel-estudiante/panel-estudiante.component';
import { RegistroPersonalComponent } from './personal/registro-personal/registro-personal.component';
import { RegistroUnicoComponent } from './personal/registro-unico/registro-unico.component';
import { LoginComponent } from './user/login/login.component';
import { PortalComponent } from './Portal/portal/portal.component';
import { PrincipalDocenteComponent } from './panel-control/principal-docente/principal-docente.component';
import { PrincipalDirectorComponent } from './panel-control/principal-director/principal-director.component';
import { PrincipalEstudianteComponent } from './panel-control/principal-estudiante/principal-estudiante.component';
import { PruebaComponent } from './prueba/prueba.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListaEstudiantesComponent } from './estudiante/lista-estudiantes/lista-estudiantes.component';
import { BandejaSalidaComponent } from './comunicado/bandeja-salida/bandeja-salida.component';
import { ConfiguracionPersonalComponent } from './personal/configuracion-personal/configuracion-personal.component';
import { ListaEstudiantesDocenteComponent } from './Docente/lista-estudiantes-docente/lista-estudiantes-docente.component';
import { ListaApoderadosDocenteComponent } from './Docente/lista-apoderados-docente/lista-apoderados-docente.component';
import { ComunicadoDocenteComponent } from './Docente/comunicado-docente/comunicado-docente.component';
import { ListaTutoresComponent } from './personal/lista-tutores/lista-tutores.component';
import { AjustesDocenteComponent } from './Docente/ajustes-docente/ajustes-docente.component';

const routes: Routes = [
  {path:"", component:PortalComponent},
  {path: "login", component:LoginComponent},
  {path: "registro-admin", component:RegistroUnicoComponent},
  //Ruta principal
  {path:"Docente",component:PrincipalDocenteComponent,
    children:[
      {path:"lista-estudiantes", component: ListaEstudiantesDocenteComponent},
      {path:"lista-apoderados", component: ListaApoderadosDocenteComponent},
      {path:"redactar-comunicado", component: PanelComunicadoComponent},
      {path:"ajustes-docente", component:AjustesDocenteComponent}
    ]
  },
  {path:"Admin",component:PrincipalDirectorComponent,
    children:[
      {path: "control-docente", component:PanelPersonalComponent,
        children:[
          {path:"registro-docente", component:RegistroPersonalComponent},
          {path:"lista-personal", component:ListaPersonalComponent},
          {path:"lista-tutores", component:ListaTutoresComponent}
        ]
      },
      {path:"estudiante",component:PanelEstudianteComponent,
        children:[
          {path:"registro-estudiante", component: RegistroEstudianteComponent},
          {path:"lista-estudiante", component: ListaEstudiantesComponent}
        ]
      },
      {path:'comunicado', component:PanelComunicadoComponent},
      {path:'bandeja-salida', component:BandejaSalidaComponent},
      {path:"configuracion", component:ConfiguracionPersonalComponent}
    ]
  },
  {path:"prueba",component:PruebaComponent},
  {path:"**",component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
