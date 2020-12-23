import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grado } from 'src/app/clases/grado';
import { Seccion } from 'src/app/clases/seccion';
import { userCurrent } from 'src/app/clases/user';
import { PeticionService } from 'src/app/service/peticion.service';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent implements OnInit {

  crearFormulario:FormGroup
  listaSecciones: Array<Seccion>
  listaGrado: Array<Grado>
  Mgrado:String
  Mseccion:String
  Mcorrecto:boolean = false
  barraCarga:boolean = false
  verCargaPhoto:boolean = false
  porcentajeSubidaFoto:number = 0
  usuarioActual:userCurrent

  imgURL:String

  constructor(
    private formBuilder:FormBuilder,
    private peticion:PeticionService,
    private storage: AngularFireStorage,
    private auth:AngularFireAuth) {

    this.crearFomularioRegistroAlumnado()
    this. Secciones();
    this.Grados();
  }

  ngOnInit(): void {
  }
  crearFomularioRegistroAlumnado(){

    this.crearFormulario = this.formBuilder.group({
      grado:['',Validators.required],
      seccion:['',Validators.required],
      dni_estudiante:['',[Validators.required,Validators.minLength(8),Validators.pattern(/^([0-9])*$/)]],
      nombre_estudiante:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoP_estudiante:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoM_estudiante:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      photo:['',[Validators.required]],
      correo_estudiante:['',[Validators.required,Validators.email]],

      dni_apoderado:['',[Validators.required,Validators.minLength(8),Validators.pattern(/^([0-9])*$/)]],
      nombre_apoderado:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoP_apoderado:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoM_apoderado:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      correo_apoderado:['',[Validators.required,Validators.email]],
      celular_apoderado:['',[Validators.required,Validators.minLength(9),Validators.pattern(/^([0-9])*$/)]],
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

  onFile(event) {
    const file = event.target.files[0];
    const ruta = 'studentPhotos/'+this.crearFormulario.value.dni_estudiante;
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
  }

  cerrarSesion(){
    this.auth.signOut();
  }

  registrar(){
    //pasar la url de la imagen y registrar
    this.crearFormulario.value.photo = this.imgURL
    this.peticion.registroEstudiante(this.crearFormulario.value).subscribe(
      (res)=>{
        //cerrar sesión ni bie se crea el usuario
        this.porcentajeSubidaFoto = 0;
        this.barraCarga = false
        this.crearFormulario.reset();
      },
      (error)=>{
        console.log(error)
      }
    )

  }

  cancelar(){
    this.crearFormulario.reset()
  }

  mostrarMensaje(iconMessaje:any, titleMessaje:any){

  }



}
