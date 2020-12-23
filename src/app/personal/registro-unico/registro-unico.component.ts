import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Profile } from 'src/app/clases/Profile';
import { PeticionService } from '../../../app/service/peticion.service'

//importa ut de firebase
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-registro-unico',
  templateUrl: './registro-unico.component.html',
  styleUrls: ['./registro-unico.component.css']
})
export class RegistroUnicoComponent implements OnInit {

  listaSeccion = new Array<string>();
  listaGrado = new Array<string>();
  listaProfile = new  Array<Profile>();

  obtenerDNI:String
  crearFormulario: FormGroup
  primerRegistro:boolean
  resultadoPhoto:boolean = false
  estutor:boolean = false
  mMensaje:boolean = false
  barraCarga:boolean = false
  verCargaPhoto:boolean = false
  porcentajeSubidaFoto:number = 0
  imgURL:String
  //aviable de vista component registro unico
  existeData:boolean = false

  constructor(
    private formbuilder:FormBuilder,
    private ruta:Router,
    private peticion: PeticionService,
    private storage: AngularFireStorage,
    private xnespiner:NgxSpinnerService,
    private auth: AngularFireAuth) {

    //verificar si existe un usuario en la tabla staff
    peticion.existeAdmin().subscribe((res)=>{
      if (res!=0) {
        this.ruta.navigateByUrl('login');
      } else {
        this.existeData = true
      }

    })

    this.crearformulario();
    this.Profile();

  }

  ngOnInit(): void {
  }

  //crea el formulario
  crearformulario() {
    this.crearFormulario = this.formbuilder.group({
      dni:['',[Validators.required,Validators.minLength(8),Validators.pattern(/^([0-9])*$/)]],
      nombre:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoP:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoM:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      correo:['',[Validators.required,Validators.email]],
      celular:['',[Validators.required,Validators.minLength(9),Validators.pattern(/^([0-9])*$/)]],
      tipoPersonal:['',Validators.required],
      photo:['',[Validators.required]]
    })
  }

  //lista los perfile de la base de datos
  Profile(){
    this.peticion.listaProfile().subscribe((res)=>{
      this.listaProfile = res as any
    })
  }

  onFile(event) {
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

  }

  registrarData() {
    this.crearFormulario.value.photo = this.imgURL
    this.peticion.registroUnico(this.crearFormulario.value).subscribe(
      (res)=>{
        if (res==1) {
            this.xnespiner.show();
            setTimeout(() => {
                this.crearFormulario.reset()
                this.ruta.navigateByUrl('login');
                this.xnespiner.hide();
            }, 2000);

        } else {
          this.peticion.mensaje(res,3000,'center','top')
        }
      },
      (error)=>{
        console.log(error)
      })
  }

  cancelar(){
    this.crearFormulario.reset();
  }

  llenarDatos(){

  }

}
