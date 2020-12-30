import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeticionService } from 'src/app/service/peticion.service';
import { Seccion } from 'src/app/clases/seccion';
import { Grado } from 'src/app/clases/grado';
import { AngularFireStorage } from '@angular/fire/storage';
import { Profile } from 'src/app/clases/Profile';
import { userCurrent } from 'src/app/clases/user';
import { AngularFireAuth } from '@angular/fire/auth';

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

  constructor(
    private formbuilder:FormBuilder,
    private peticion:PeticionService,
    private storage: AngularFireStorage,
    private auth:AngularFireAuth) {

    //funciones de ejecucion principal
    this.crearFormularioRegistro();
    this.Secciones();
    this.Grados();
    this.listaProfiles();
  }

  ngOnInit(): void {
  }

  crearFormularioRegistro(){
    this.crearFormulario = this.formbuilder.group({
      estadoTutor:['',[Validators.required]],
      grado:[''],
      seccion:[''],
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

  //funcion para listar los grados
  Secciones(){
    this.peticion.listaSecction().subscribe(
      (res)=>{
        this.listaSecciones = res
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  //funcion para listar secciones
  Grados(){
    this.peticion.listaGrado().subscribe(
      (res)=>{
        this.listaGrado = res
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  verificarTutor(){
    if(this.crearFormulario.value.estadoTutor=='Si'){
      this.esconderCampo = true
    } else {
      this.esconderCampo = false
    }

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
    if (this.verificarCamposRegistrar()==true) {
        //pasar la url de la imagen y registrar
        this.crearFormulario.value.photo = this.imgURL
        this.peticion.registroPersonal(this.crearFormulario.value).subscribe(
          (res)=>{
          //cerrar sesión ni bie se crea el usuario
          this.porcentajeSubidaFoto = 0;
          this.barraCarga = false
          this.crearFormulario.reset();
          this.peticion.mensaje("Personal registrado correctamente",3500,'center','center')
        },
          (error)=>{
            console.log(error)
          }
        )
    }
  }

  verificarDNIDB(){
    let existe = false;
    this.peticion.existeDNI(this.crearFormulario.value.dni).subscribe(
      (res)=>{
        if (res==null || res=="") {
            existe = true;
            this.crearFormulario.controls.photo.enable()
        } else {
          existe = false;
          this.crearFormulario.controls.photo.disable()
          this.peticion.mensaje(res,4500,'center','center')
        }
      },
      (error)=>{
        existe = false;
        console.log(error)
      }
    )
  }

  verificarEmailBD(){
    let existe = false;
    this.peticion.existeEmail(this.crearFormulario.value.correo).subscribe(
      (res)=>{
        if (res==null || res=="") {
            existe = true;
            this.crearFormulario.controls.photo.enable()
        } else {
          existe = false;
          this.crearFormulario.controls.photo.disable()
          this.peticion.mensaje(res,4500,'center','center')
        }
      },
      (error)=>{
        existe = false;
        console.log(error)
      }
    )
  }

  verificarCamposRegistrar():boolean{
    let verificar = false
    //verificar los campos grados y secciones
    if (this.esconderCampo==true && this.crearFormulario.value.grado=="" && this.crearFormulario.value.seccion=="") {
        this.peticion.mensaje("Complete los campos grado y sección",3000,'center','center')
    } else {
      if (this.crearFormulario.value.grado=="" && this.esconderCampo==true) {
        this.peticion.mensaje("Complete los campos grado",3000,'center','center')
      } else if (this.crearFormulario.value.seccion=="" && this.esconderCampo==true) {
        this.peticion.mensaje("Complete los campos Sección",3000,'center','center')
      }
    }
    //if general de verificacion
    if(
      this.crearFormulario.value.grado!="" &&
      this.crearFormulario.value.seccion!="" ||
      this.crearFormulario.value.estadoTutor=="No") {
      verificar = true
    }

    return verificar
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
    this.crearFormulario.reset();
  }
  mostrarMensaje(iconMessaje:any, titleMessaje:any){

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
