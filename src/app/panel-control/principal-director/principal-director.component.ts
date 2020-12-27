import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';

@Component({
  selector: 'app-principal-director',
  templateUrl: './principal-director.component.html',
  styleUrls: ['./principal-director.component.css']
})
export class PrincipalDirectorComponent implements OnInit {
  dataUser:Usuario
  vista:boolean = false
  constructor(private auth:AngularFireAuth, private ruta:Router, private peticion:PeticionService) {
    this.sesionInciada();
  }

  ngOnInit(): void {
  }

  sesionInciada(){
    this.dataUser = JSON.parse(localStorage.getItem("current"))
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
