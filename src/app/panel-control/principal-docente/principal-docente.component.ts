import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
//crypto
import * as CryptoJS from 'crypto-js';
import { catchError, retry } from 'rxjs/operators';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';
import { PeticionService } from 'src/app/service/peticion.service';

@Component({
  selector: 'app-principal-docente',
  templateUrl: './principal-docente.component.html',
  styleUrls: ['./principal-docente.component.css']
})
export class PrincipalDocenteComponent implements OnInit {
  dataUser:Usuario
  vista:boolean = false
  constructor(
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
      this.dataUser = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))
      if (this.dataUser==null || this.dataUser==null) {
          this.ruta.navigateByUrl('login');
      } else {
        this.peticion.obtenerPerfilCurrent(this.dataUser.user).subscribe(
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
