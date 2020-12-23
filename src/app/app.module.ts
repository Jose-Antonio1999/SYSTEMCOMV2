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

//firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage/';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PrincipalEstudianteComponent } from './panel-control/principal-estudiante/principal-estudiante.component';
import { PrincipalDirectorComponent } from './panel-control/principal-director/principal-director.component';
import { PrincipalDocenteComponent } from './panel-control/principal-docente/principal-docente.component';
import { PruebaComponent } from './prueba/prueba.component';

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
    PruebaComponent
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
    FormsModule
  ],

  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
