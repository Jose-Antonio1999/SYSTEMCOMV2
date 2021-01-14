import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material/angular-material/angular-material.module'
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RegistroUnicoComponent } from './personal/registro-unico/registro-unico.component';
import { PanelEstudianteComponent } from './estudiante/panel-estudiante/panel-estudiante.component';
import { MenuComponent } from './compartir/menu/menu.component';
import { PiePaginaComponent } from './compartir/pie-pagina/pie-pagina.component';
import { RegistroPersonalComponent } from './personal/registro-personal/registro-personal.component';
import { PanelPersonalComponent } from './personal/panel-personal/panel-personal.component';
import { ListaPersonalComponent } from './personal/lista-personal/lista-personal.component';
import { PanelComunicadoComponent } from './comunicado/panel-comunicado/panel-comunicado.component';
import { RegistroEstudianteComponent } from './estudiante/registro-estudiante/registro-estudiante.component';
import { ListaEstudiantesComponent } from './estudiante/lista-estudiantes/lista-estudiantes.component';
import { HttpClientModule } from '@angular/common/http';
import { PortalComponent } from './Portal/portal/portal.component';

//importar para el editex
import { NgxWigModule } from 'ngx-wig';
import * as CryptoJS from 'crypto-js';
import { catchError, retry } from 'rxjs/operators';
//firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage/';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PrincipalEstudianteComponent } from './panel-control/principal-estudiante/principal-estudiante.component';
import { PrincipalDirectorComponent } from './panel-control/principal-director/principal-director.component';
import { PrincipalDocenteComponent } from './panel-control/principal-docente/principal-docente.component';
import { PruebaComponent } from './prueba/prueba.component';
import { PanelDocenteComponent } from './Docente/panel-docente/panel-docente.component';
import { MenuDocenteComponent } from './Docente/menu-docente/menu-docente.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BandejaSalidaComponent } from './comunicado/bandeja-salida/bandeja-salida.component';
import { ConfiguracionPersonalComponent } from './personal/configuracion-personal/configuracion-personal.component';
import { ListaApoderadosDocenteComponent } from './Docente/lista-apoderados-docente/lista-apoderados-docente.component';
import { ListaEstudiantesDocenteComponent } from './Docente/lista-estudiantes-docente/lista-estudiantes-docente.component';
import { ComunicadoDocenteComponent } from './Docente/comunicado-docente/comunicado-docente.component';
import { ListaTutoresComponent } from './personal/lista-tutores/lista-tutores.component';
import { ModalAsignarTutorComponent } from './modals/modal-asignar-tutor/modal-asignar-tutor.component';
import { AjustesDocenteComponent } from './Docente/ajustes-docente/ajustes-docente.component';
import { DataDocenteComponent } from './Docente/Modal-docente/data-docente/data-docente.component';
import { BuscarApoderadoPipe } from './pipes/buscar-apoderado.pipe';
import { BuscarEstudiantePipe } from './pipes/buscar-estudiante.pipe';
import { VistaImagenUserComponent } from './modals/vista-imagen-user/vista-imagen-user.component';
import { BuscarPersonalPipe } from './pipes/buscar-personal.pipe';
import { AlertasComponent } from './modals/alertas/alertas.component';
import { PanelStudentComponent } from './Interface-estudiante/panel-student/panel-student.component';
import { MenuStudentComponent } from './Interface-estudiante/menu-student/menu-student.component';
import { EditarEstudianteComponent } from './modals/editar-estudiante/editar-estudiante.component';
import { PanelFormularioComponent } from './Docente/Formulario/panel-formulario/panel-formulario.component';
import { CrearFormularioComponent } from './Docente/Formulario/crear-formulario/crear-formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUnicoComponent,
    PanelEstudianteComponent,
    MenuComponent,
    PiePaginaComponent,
    RegistroPersonalComponent,
    PanelPersonalComponent,
    ListaPersonalComponent,
    PanelComunicadoComponent,
    RegistroEstudianteComponent,
    ListaEstudiantesComponent,
    PortalComponent,
    PrincipalEstudianteComponent,
    PrincipalDirectorComponent,
    PrincipalDocenteComponent,
    PruebaComponent,
    PanelDocenteComponent,
    MenuDocenteComponent,
    NotFoundComponent,
    BandejaSalidaComponent,
    ConfiguracionPersonalComponent,
    ListaApoderadosDocenteComponent,
    ListaEstudiantesDocenteComponent,
    ComunicadoDocenteComponent,
    ListaTutoresComponent,
    ModalAsignarTutorComponent,
    AjustesDocenteComponent,
    DataDocenteComponent,
    BuscarApoderadoPipe,
    BuscarEstudiantePipe,
    VistaImagenUserComponent,
    BuscarPersonalPipe,
    AlertasComponent,
    PanelStudentComponent,
    MenuStudentComponent,
    EditarEstudianteComponent,
    PanelFormularioComponent,
    CrearFormularioComponent
  ],
  entryComponents:[
    ModalAsignarTutorComponent,
    AjustesDocenteComponent,
    VistaImagenUserComponent,
    AlertasComponent,
    RegistroEstudianteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    NgxWigModule
  ],

  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
