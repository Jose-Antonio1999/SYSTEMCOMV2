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
import { ListaEstudiantesComponent } from './estudiante/lista-estudiantes/lista-estudiantes.component';
import { BandejaSalidaComponent } from './comunicado/bandeja-salida/bandeja-salida.component';
import { ConfiguracionPersonalComponent } from './personal/configuracion-personal/configuracion-personal.component';
import { ListaEstudiantesDocenteComponent } from './Docente/lista-estudiantes-docente/lista-estudiantes-docente.component';
import { ListaApoderadosDocenteComponent } from './Docente/lista-apoderados-docente/lista-apoderados-docente.component';
import { ComunicadoDocenteComponent } from './Docente/comunicado-docente/comunicado-docente.component';
import { ListaTutoresComponent } from './personal/lista-tutores/lista-tutores.component';
import { AjustesDocenteComponent } from './Docente/ajustes-docente/ajustes-docente.component';
import { PanelFormularioComponent } from './Docente/Formulario/panel-formulario/panel-formulario.component';
import { CrearFormularioComponent } from './Docente/Formulario/crear-formulario/crear-formulario.component';
import { ListaRespuestasComponent } from './Docente/Formulario/lista-respuestas/lista-respuestas.component';
import { PanelStudentComponent } from './Interface-estudiante/panel-student/panel-student.component';
import { BienvenidaSistemaComponent } from './compartir/bienvenida-sistema/bienvenida-sistema.component';
import { CarpetaTutoriaComponent } from './Interface-estudiante/tutoria/carpeta-tutoria/carpeta-tutoria.component';
import { ListaPadresComponent } from './estudiante/lista-padres/lista-padres.component';
import { MensajeNotutorComponent } from './compartir/mensaje-notutor/mensaje-notutor.component';
import { NotFoundPageComponent } from './compartir/not-found-page/not-found-page.component';
import { PanelTutoriaComponent } from './Interface-estudiante/tutoria/panel-tutoria/panel-tutoria.component';
import { InfoTutorComponent } from './Interface-estudiante/tutoria/info-tutor/info-tutor.component';
import { ResponerFormularioComponent } from './Interface-estudiante/tutoria/responer-formulario/responer-formulario.component';
import { MensajesGuardadosComponent } from './comunicado/mensajes-guardados/mensajes-guardados.component';
import { MisFormulariosComponent } from './Docente/Formulario/mis-formularios/mis-formularios.component';
import { RecoveryPasswordComponent } from './user/recovery-password/recovery-password.component';

const routes: Routes = [
  {path:"", component:PortalComponent},
  {path: "login", component:LoginComponent},
  {path:"recuperar",component:RecoveryPasswordComponent},
  {path: "registro-admin", component:RegistroUnicoComponent},
  //Ruta principal
  {path:"Docente",component:PrincipalDocenteComponent,
    children:[
      {path:'bienvenida', component: BienvenidaSistemaComponent},
      {path:"lista-estudiantes", component: ListaEstudiantesDocenteComponent},
      {path:"lista-apoderados", component: ListaApoderadosDocenteComponent},
      {path:"redactar-comunicado", component: ComunicadoDocenteComponent},
      {path:"ajustes-docente", component:AjustesDocenteComponent},
      {path:'bandeja-salida', component:BandejaSalidaComponent},
      {path:'mensajes-guardados', component:MensajesGuardadosComponent},
      {path:"formulario", component:PanelFormularioComponent,
        children:[
          {path:"crear-formulario", component:CrearFormularioComponent},
          {path:"Lista-respuestas", component:ListaRespuestasComponent},
          {path: 'mis-formularios', component:MisFormulariosComponent}
        ]
      }
    ]
  },
  {path:"Admin",component:PrincipalDirectorComponent,
    children:[
      {path:'bienvenida', component: BienvenidaSistemaComponent},
      {path: "control-docente", component:PanelPersonalComponent,
        children:[
          {path:"registro-docente", component:RegistroPersonalComponent},
          {path:"lista-personal", component:ListaPersonalComponent},
          {path:"lista-tutores", component:ListaTutoresComponent}
        ]
      },
      {path:"lista-padres",component:ListaPadresComponent},
      {path:"estudiante",component:PanelEstudianteComponent,
        children:[
          {path:"registro-estudiante", component: RegistroEstudianteComponent},
          {path:"lista-estudiante", component: ListaEstudiantesComponent}
        ]
      },
      {path:'comunicado', component:PanelComunicadoComponent},
      {path:'bandeja-salida', component:BandejaSalidaComponent},
      {path:'mensajes-guardados', component:MensajesGuardadosComponent},
      {path:"configuracion", component:ConfiguracionPersonalComponent}
    ]
  },
  {
    path: "Estudiante", component:PrincipalEstudianteComponent,
    children:[
      {path:'bienvenida', component: BienvenidaSistemaComponent},
      {path:'perfil-estudiante', component: PanelStudentComponent},
      {path:'tutoria', component: PanelTutoriaComponent,
        children:[
          {path:'carpeta-tutoria', component: CarpetaTutoriaComponent,},
          {path: 'formulario', component:ResponerFormularioComponent},
          {path:'info-user', component:InfoTutorComponent}
        ]
      }
    ]
  },
  {path:"prueba",component:PruebaComponent},
  {path:"**",component:NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
