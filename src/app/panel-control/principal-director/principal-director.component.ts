import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';
import { environment } from 'src/environments/environment';
//crypto
import * as CryptoJS from 'crypto-js';
import { catchError, retry } from 'rxjs/operators';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-principal-director',
  templateUrl: './principal-director.component.html',
  styleUrls: ['./principal-director.component.css']
})
export class PrincipalDirectorComponent implements OnInit {
  usuarioActivo:Usuario
  vista:boolean = false
  constructor(
    private auth:AngularFireAuth,
    private ruta:Router,
    private peticion:PeticionService,
    private storage:StorageService) {
    this.sesionInciada();
  }

  ngOnInit(): void {
  }

  sesionInciada(){

    if (localStorage.getItem("current")==null || localStorage.getItem("current")=="") {
        this.ruta.navigateByUrl('login');
    } else {
      this.usuarioActivo = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))
      if (this.usuarioActivo==null || this.usuarioActivo==null) {
          this.ruta.navigateByUrl('login');
      } else {
        this.peticion.obtenerPerfilCurrent(this.usuarioActivo.DNI).subscribe(
          (res)=>{
            if (res==null || res=="") {
              this.vista = false
              this.ruta.navigateByUrl('login');
            }
          },
          (error)=>{
            console.log(error)
          }
        )
      }

    }
  }


}
