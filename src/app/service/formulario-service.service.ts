import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioServiceService {

  URLRegistro:String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/registrar/";
  URLListar:String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/Listar/";
  URLenvio: String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/envios/"
  URLactualizar: String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/actualizar/"

  constructor(private http:HttpClient, private snackBar: MatSnackBar) { }

  //funciones de peción lista
  listaFormulario(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"obtenerFormulario.php",JSON.stringify(data));
  }
  listaFormularioDocente(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"listaFormulariosDocente.php",data);
  }


  listaQuestion(data):Observable<any>{
    return this.http.post<any>(this.URLListar+"listarQuestion.php",data);
  }

  formularioRespondido(data):Observable<any>{
    return this.http.post<any>(this.URLListar+"verificarStadoFormulario.php",data);
  }

  //envio de respuestas
  sendAnswer(data):Observable<any>{
    return this.http.post<any>(this.URLenvio+"envioRespuestas.php",JSON.stringify(data));
  }

  //update
  estadoFormualrio(data):Observable<any>{
    return this.http.post<any>(this.URLactualizar+"estadoFormulario.php",JSON.stringify(data));
  }

  //eliminar formulario
  eliminarFormulario(data):Observable<any>{
    return this.http.post<any>(this.URLactualizar+"eliminarFormulario.php",data);
  }

}
