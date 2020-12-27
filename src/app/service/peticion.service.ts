import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Profile } from '../clases/Profile'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class PeticionService {

  profile:Profile
  URLRegistro:String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/registrar/";
  URLListar:String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/Listar/";
  URLsubidaarchvio: String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/archivos/"
  URLenvio: String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/envios/"

  constructor(private http:HttpClient, private snackBar: MatSnackBar) { }

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
  obtenerPerfilCurrent(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"currentUser.php",data);
  }
  //funciones de subida de archivo
  verificarPhoto(data:any):Observable<any>{
    return this.http.post<any>(this.URLsubidaarchvio+"verificarPhoto.php",data);
  }

  //funcion de verificacion de usurios
  existeAdmin(){
    return this.http.get<any>(this.URLListar+"verificarAdmin.php");
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

}
