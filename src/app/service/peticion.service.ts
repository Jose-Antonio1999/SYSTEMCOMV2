import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Profile } from '../clases/Profile'
import { ConsultaDNI } from '../clases/API'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Staff } from '../clases/staff';
import { Area } from '../clases/Area';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PeticionService {


  Consulta:ConsultaDNI

  profile:Profile
  URLRegistro:String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/registrar/";
  URLListar:String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/Listar/";
  URLsubidaarchvio: String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/archivos/"
  URLenvio: String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/envios/"
  URLactualizar: String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/actualizar/"

  constructor(
    private http:HttpClient,
    private snackBar: MatSnackBar,
    private ruta:Router) { }

  //funciones de petición registro
  registroUnico(data):Observable<any>{
    return this.http.post<any>(this.URLRegistro+'registroUnico.php',JSON.stringify(data));
  }
  registroPersonal(data):Observable<any>{
    return this.http.post<any>(this.URLRegistro+'registroPersonal.php',JSON.stringify(data));
  }
  registroEstudiante(data):Observable<any>{
    return this.http.post<any>(this.URLRegistro+'registroEstudiante.php',JSON.stringify(data));
  }
  registroTutor(data):Observable<any>{
    return this.http.post<any>(this.URLRegistro+'registrarTutor.php',JSON.stringify(data));
  }
  guardarMensaje(data):Observable<any>{
    return this.http.post<any>(this.URLRegistro+'guardarMensaje.php',JSON.stringify(data));
  }


  //funciones de peción lista
  listaProfile():Observable<Profile>{
    return this.http.get<any>(this.URLListar+"listaperfiluser.php");
  }

  listaGrado():Observable<any>{
    return this.http.get<any>(this.URLListar+"listarGrado.php");
  }

  listaSecction():Observable<any>{
    return this.http.get<any>(this.URLListar+"listarSeccion.php");
  }
  listaStaff():Observable<Staff>{
    return this.http.get<Staff>(this.URLListar+"listaStaff.php");
  }
  listaStafftutores():Observable<Staff>{
    return this.http.get<Staff>(this.URLListar+"listaStafftutor.php");
  }
  listaTutoresAsignados():Observable<Staff>{
    return this.http.get<Staff>(this.URLListar+"listaTutoresAsignados.php");
  }
  listaStudent(data:any):Observable<Staff>{
    return this.http.post<Staff>(this.URLListar+"listaStudent.php",JSON.stringify(data));
  }
  listaDataStudent(data:any):Observable<Staff>{
    return this.http.post<Staff>(this.URLListar+"dataEstudent.php",JSON.stringify(data));
  }
  listaArea():Observable<any>{
    return this.http.get<any>(this.URLListar+"listarAreaTutoria.php");
  }
  listaTipoPregunta():Observable<any>{
    return this.http.get<any>(this.URLListar+"listarTipoPregunta.php");
  }
  listaComunicado(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"listaComunicado.php",data);
  }
  listaComunicadoGuardado(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"listaComunicadosGuardados.php",data);
  }
  obtenerPerfilCurrent(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"currentUser.php",data);
  }
  obtenerPerfilStudent(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"currentStudent.php",data);
  }
  obtenerTutor(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"currentTutor.php",data);
  }
  obtenerRespuesta(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"listaRespuestas.php",data);
  }
  numeroEmailsDocentesGeneral():Observable<any>{
    return this.http.get<any>(this.URLListar+"emailDocentesGeneral.php");
  }
  datosTutor(data:any):Observable<Staff>{
    return this.http.post<Staff>(this.URLListar+"infotutor.php",JSON.stringify(data));
  }


  //funcion de verificacion de usurios
  existeAdmin(){
    return this.http.get<any>(this.URLListar+"verificarAdmin.php");
  }
   //funciones de subida de archivo
  ExisteDatoUsuario(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"verificarStaff.php",data);
  }
  existeDNI(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"verificarDNI.php",data);
  }
  existeEmail(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"verificarEmails.php",data);
  }
  existeApoderado(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"verificarPadre.php",data);
  }
  existeAlumno(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"verificarAlumno.php",data);
  }
  verificarActivo(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"verificarActivoStaff.php",data);
  }

  //funcion mensaje
  mensaje(mensaje:any,duracion:any,horizontalPosi:any,verticalPosi:any){
    this.snackBar.open(mensaje, "", {
      duration: duracion,
      horizontalPosition: horizontalPosi,
      verticalPosition: verticalPosi,
    });
  }

  //funcion Login
  Login(data):Observable<any>{
    return this.http.post<any>(this.URLListar+"dataLogin.php",data);
  }

  //funciones de envio de comunicados
  enviarComunicado(data:any):Observable<any>{
    return this.http.post<any>(this.URLenvio+"envioComunicado.php",JSON.stringify(data));
  }
  enviarComunicadoDocente(data:any):Observable<any>{
    return this.http.post<any>(this.URLenvio+"envioComunicadoDocente.php",JSON.stringify(data));
  }
  enviarFormulario(data:any):Observable<any>{
    return this.http.post<any>(this.URLenvio+"envioFormulario.php",JSON.stringify(data));
  }
  restablecerPass(data:any):Observable<any>{
    return this.http.post<any>(this.URLenvio+"recoveryPassword.php",JSON.stringify(data));
  }

  //autocompletado de dato
  APIdni(dni:String):Observable<ConsultaDNI>{
    return this.http.get<ConsultaDNI>(`https://dni.optimizeperu.com/api/persons/${dni}?format=json`)
  }

  //metodos para actualizar data
  desasignarTuor(data:any):Observable<any>{
    return this.http.post<any>(this.URLactualizar+"desasignarTutor.php",data);
  }
  statusStaff(data:any):Observable<any>{
    return this.http.post<any>(this.URLactualizar+"statusPersonal.php",JSON.stringify(data));
  }
  updateStudent(data:any):Observable<any>{
    return this.http.post<any>(this.URLactualizar+"updateStudent.php",JSON.stringify(data));
  }
  updateSocialData(data:any):Observable<any>{
    return this.http.post<any>(this.URLactualizar+"socialDataStaff.php",JSON.stringify(data));
  }
  updateSocialDataStudent(data:any):Observable<any>{
    return this.http.post<any>(this.URLactualizar+"socialDataStudent.php",JSON.stringify(data));
  }
  updatePassword(data:any):Observable<any>{
    return this.http.post<any>(this.URLactualizar+"updatePassword.php",JSON.stringify(data));
  }
  updateStaff(data:any):Observable<any>{
    return this.http.post<any>(this.URLactualizar+"updateStaff.php",JSON.stringify(data));
  }
  AccessStudent(data:any):Observable<any>{
    return this.http.post<any>(this.URLactualizar+"AccessStudent.php",JSON.stringify(data));
  }

  //eliminar comunicado
  eliminarComunicado(data:any):Observable<any>{
    return this.http.post<any>(this.URLactualizar+"eliminarComunicado.php",data);
  }

  //funciones extras
  gradoSegunName(gray:any):String{
    let resul
    switch (parseInt(gray)) {
      case 1: resul = 'ro'
        break;
      case 2: resul = 'do'
        break;
      case 3: resul = 'ro'
        break;
      case 4: resul = 'to'
        break;
      case 5: resul = 'to'
        break;
    }
  return resul
  }
  idSeccion(seccion:any):string{
    let resul
    switch (seccion) {
      case 'A': resul = '1'
        break;
      case 'B': resul = '2'
        break;
      case 'C': resul = '3'
        break;
      case 'D': resul = '4'
        break;
      case 'E': resul = '5'
        break;
      case 'F': resul = '6'
        break;
    }
  return resul
  }

  //funcion de redirección
  redireccionarPagina(data:number) {
    if (data==10) {
      //director
      this.ruta.navigateByUrl("Admin/bienvenida")
    }
    if(data==20) {
      //subdirector
      this.ruta.navigateByUrl("Admin/bienvenida")
    }
    if(data==30) {
      //docente
      this.ruta.navigateByUrl("Docente/bienvenida")
    }
    if(data==40) {
      //secretaria
      this.ruta.navigateByUrl("Admin/bienvenida")
    }
    if(data==50) {
      //estudiante
      this.ruta.navigateByUrl("Estudiante/bienvenida")
    }

  }
}
