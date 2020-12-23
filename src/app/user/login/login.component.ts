import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PeticionService } from 'src/app/service/peticion.service';
import { Usuario } from '../../clases/usuario'
import { userCurrent } from '../../clases/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Formulario:FormGroup
  existeData:boolean = false;
  mensaje:String
  aviso:boolean = false
  Usuario:Usuario
  usuarioActual:userCurrent

  constructor(
    private formbuilder:FormBuilder,
    private petecion:PeticionService,
    private ruta:Router,
    private spinner:NgxSpinnerService,
    private auth:AngularFireAuth) {
    //petición para verificar algun usuario
    petecion.existeAdmin().subscribe((res)=>{
      if(res==0){
        this.ruta.navigateByUrl('registro-admin')
      } else {
        this.existeData = true;
      }

    })
    //creamos el formulario
    this.crearFormulario ();
  }

  ngOnInit(): void {
  }

  crearFormulario () {
    this.Formulario = this.formbuilder.group({
      user: ['',[Validators.required]],
      pass: ['',[Validators.required]]
    })
  }
  //funcion para guardar data en localstorage
  guardarUsuario (user:any) {
    localStorage.setItem("current",JSON.stringify(user))
  }

  ingresar(){
    this.petecion.Login(this.Formulario.value).subscribe(
      (res)=>{

        this.spinner.show()
        setTimeout(() => {
          if(res==0 || res == null || res ==""){
            this.aviso = true
            this.mensaje = "Usuario o Contraseña incorrectas"
            setTimeout(() => {
              this.aviso = false
            }, 2000);
          } else {
            //normalizar al usuario
            this.Usuario = res[0]
            //console.log(this.Usuario)
            this.guardarUsuario(this.Usuario)
            this.redireccionarPagina(this.Usuario.profile)
          }
          this.spinner.hide()
        }, 1000);

      },
      (error)=>{
        console.log(error)
      }
    )
  }

  //funcion de redirección
  redireccionarPagina(data:number) {
    if (data==10) {
      //director
      this.ruta.navigateByUrl("Admin")
    }
    if(data==20) {
      //subdirector
      this.ruta.navigateByUrl("Admin")
    }
    if(data==30) {
      //docente
      this.ruta.navigateByUrl("Docente")
    }
    if(data==40) {
      //secretaria
      this.ruta.navigateByUrl("Admin")
    }
    if(data==40) {
      //estudiante
      this.ruta.navigateByUrl("Estudiante")
    }



  }



}
