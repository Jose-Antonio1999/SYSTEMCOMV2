import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';
import { Usuario } from '../../clases/usuario'
import { userCurrent } from '../../clases/user'
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/internal/operators';
//crypto
import * as CryptoJS from 'crypto-js';
//uso de MD5
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('passw',{static:false}) passw:ElementRef
  Formulario:FormGroup
  existeData:boolean = false;
  mensaje:String
  aviso:boolean = false
  Usuario:Usuario
  usuarioActual:userCurrent
  verPass:boolean = false
  mensajeCarga:String

  constructor(
    private formbuilder:FormBuilder,
    private petecion:PeticionService,
    private ruta:Router,
    private spinner:NgxSpinnerService,
    private auth:AngularFireAuth,
    private storage:StorageService) {
    //petición para verificar algun usuario
    petecion.existeAdmin().subscribe((res)=>{
      if(res==0){
        this.ruta.navigateByUrl('registro-admin')
      } else {
        this.existeData = true;
      }

    })
    //creamos el formulario
    //this.verificarLogin();
    this.crearFormulario ();
  }

  ngOnInit(): void {
    this.mensajeCarga = "Cargando"
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 2000);
  }

  crearFormulario () {
    this.Formulario = this.formbuilder.group({
      user: ['',[Validators.required]],
      pass: ['',[Validators.required]]
    })
  }
  //funcion para guardar data en localstorage
  guardarUsuario (user:any) {
    //guaradar el usuario encriptado
    localStorage.setItem("current",this.storage.encrypt(JSON.stringify(user)))
  }
  verificarLogin() {
    if (localStorage.getItem("current")!=null) {
      this.Usuario = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))
      this.redireccionarPagina(this.Usuario.profile)
    }
  }

  ingresar(){
    //encryptar pass
    // const md5 = new Md5();
    // this.Formulario.value.pass = md5.appendStr(this.Formulario.value.pass).end();
    //realizar petición
    this.petecion.Login(this.Formulario.value).subscribe(
      (res)=>{

        this.spinner.show()
        this.mensajeCarga = "Ingresando al sistema"
        setTimeout(() => {

          if(res==0 || res =="0"){
            this.aviso = true
            this.mensaje = "Usuario o Contraseña incorrectas"
            console.log(res)
            setTimeout(() => {
              this.aviso = false
            }, 1500);

          } else {
            //normalizar al usuario
            //verificar el perfil del estudiante
            this.Usuario = res[0]
            console.log(this.Usuario)
            this.Usuario = res[0]
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

  //ingreso mediante enter
  ingresoEnter(event){
    if(event.key=="Enter") {
      this.ingresar();
    }
  }

  verPassw(){
    this.passw.nativeElement.type = "text"
    this.verPass = true
  }
  noPassw(){
    this.passw.nativeElement.type = "password"
    this.verPass = false
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
