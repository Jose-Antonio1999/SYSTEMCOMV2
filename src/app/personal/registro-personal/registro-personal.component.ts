import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeticionService } from 'src/app/service/peticion.service';
import { Seccion } from 'src/app/clases/seccion';
import { Grado } from 'src/app/clases/grado';
import { AngularFireStorage } from '@angular/fire/storage';
import { Profile } from 'src/app/clases/Profile';
import { userCurrent } from 'src/app/clases/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConsultaDNI } from 'src/app/clases/API'

@Component({
  selector: 'app-registro-personal',
  templateUrl: './registro-personal.component.html',
  styleUrls: ['./registro-personal.component.css']
})
export class RegistroPersonalComponent implements OnInit {

  listaSecciones: Array<Seccion>
  listaGrado: Array<Grado>
  listaProfile = new  Array<Profile>();
  crearFormulario:FormGroup;
  esconderCampo:boolean = false
  barraCarga:boolean = false
  verCargaPhoto:boolean = false
  porcentajeSubidaFoto:number = 0
  usuarioActual:userCurrent
  imgURL:String
  DataAPI:ConsultaDNI

  constructor(
    private formbuilder:FormBuilder,
    private peticion:PeticionService,
    private storage: AngularFireStorage,
    private auth:AngularFireAuth) {

    //funciones de ejecucion principal
    this.crearFormularioRegistro();
    this.listaProfiles();
  }

  ngOnInit(): void {
  }

  crearFormularioRegistro(){
    this.crearFormulario = this.formbuilder.group({
      tipoPersonal:['',Validators.required],
      dni:['',[Validators.required,Validators.minLength(8),Validators.pattern(/^([0-9])*$/)]],
      nombre:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoP:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoM:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      correo:['',[Validators.required,Validators.email]],
      celular:['',[Validators.required,Validators.minLength(9),Validators.pattern(/^([0-9])*$/)]],
      photo:['',[Validators.required]]
    })
  }

  onFile(event) {

    let dni = this.crearFormulario.value.dni
    let nombre = this.crearFormulario.value.nombre
    let correo = this.crearFormulario.value.correo

    if (dni!="" || nombre!="" || correo!="") {

      const file = event.target.files[0];
      const ruta = 'staffPhotos/'+this.crearFormulario.value.dni;
      const ref = this.storage.ref(ruta);
      const task = ref.put(file);

      //verificamos mientras se sube la foto
      task.then((tarea)=>{
          ref.getDownloadURL().subscribe((imgUrl)=>{
          this.imgURL = imgUrl
          this.verCargaPhoto = true
          })
      })
       //observale de la subida del archivo en %
      task.percentageChanges().subscribe((porcentaje)=>{
          this.barraCarga = true
          this.porcentajeSubidaFoto = parseInt(porcentaje.toString(),10)
      })
    } else {
      this.peticion.mensaje("Complete los campos anteriores para subir la foto",3500,'center','center')
      this.crearFormulario.controls['photo'].setValue('')
    }

  }

  GuardarDatos(){
    //pasar la url de la imagen y registrar
    this.crearFormulario.value.photo = this.imgURL
    this.peticion.registroPersonal(this.crearFormulario.value).subscribe(
      (res)=>{
      //cerrar sesión ni bie se crea el usuario
        this.porcentajeSubidaFoto = 0;
        this.barraCarga = false
        this.peticion.mensaje("Personal registrado correctamente",3500,'center','center')
        this.cancelar();
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  verificarDNIDB(){
    this.peticion.existeDNI(this.crearFormulario.value.dni).subscribe(
      (res)=>{
        if (res!="0") {
          this.crearFormulario.controls.photo.disable()
          this.peticion.mensaje(res,4500,'center','center')
        } else {
          this.crearFormulario.controls.photo.enable()
          this.APIRENIEC();
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  verificarEmailBD(){
    this.peticion.existeEmail(this.crearFormulario.value.correo).subscribe(
      (res)=>{
        if (res!="0") {
          this.crearFormulario.controls.photo.disable()
          this.crearFormulario.controls.celular.disable()
          this.peticion.mensaje(res,4500,'center','center')
        } else {
          this.crearFormulario.controls.photo.enable()
          this.crearFormulario.controls.celular.enable()
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  listaProfiles() {
    this.peticion.listaProfile().subscribe(
      (res)=>{
        this.listaProfile = res as any
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  cancelar(){
    this.crearFormularioRegistro();
    this.crearFormulario.reset();
  }
  mostrarMensaje(iconMessaje:any, titleMessaje:any){

  }
  completarDatosAPI(data:ConsultaDNI){
    this.crearFormulario.controls['nombre'].setValue(data.name)
    this.crearFormulario.controls['apellidoP'].setValue(data.first_name)
    this.crearFormulario.controls['apellidoM'].setValue(data.last_name)
  }
  APIRENIEC(){
    this.peticion.APIdni(this.crearFormulario.value.dni).subscribe(
      (res)=>{
        this.completarDatosAPI(res)
      },
      (error)=>{
        this.peticion.mensaje(error,4500,'center','center')
      }
    )
  }

  verificarDNI(){
    if(this.crearFormulario.value.dni.length==8){
      this.verificarDNIDB();
    }
  }
  verificarEmail(){
      this.verificarEmailBD()
  }
  esValidoEmail(mail:any) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
  }

}
