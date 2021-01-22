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
  URLsubidaarchvio: String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/archivos/"
  URLenvio: String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/envios/"
  URLactualizar: String = "http://localhost/SISTEMA-COMUNICADOS-V2/Backend/actualizar/"

  constructor(private http:HttpClient, private snackBar: MatSnackBar) { }

  //funciones de peción lista
  listaFormulario(data:any):Observable<any>{
    return this.http.post<any>(this.URLListar+"obtenerFormulario.php",JSON.stringify(data));
  }

  listaQuestion(data):Observable<any>{
    return this.http.post<any>(this.URLListar+"listarQuestion.php",data);
  }


}
