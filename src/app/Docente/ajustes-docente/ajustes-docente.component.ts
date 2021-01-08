import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-ajustes-docente',
  templateUrl: './ajustes-docente.component.html',
  styleUrls: ['./ajustes-docente.component.css']
})
export class AjustesDocenteComponent implements OnInit {

  dataUser:Usuario
  usercurrent: userCurrent
  cargarInterface:boolean = false
  crearFormulario:FormGroup;
  imgURL:String
  barraCarga:boolean = false
  verCargaPhoto:boolean = false
  porcentajeSubidaFoto:number = 0
  op:string = 'data-personal'
  constructor(
    private peticion:PeticionService,
    private ruta:Router,
    private storage:StorageService,
    private formbuilder:FormBuilder,
    private storageFire: AngularFireStorage
  ) {
    this. crearFormularioRegistro();
    this.sesionInciada();
  }

  ngOnInit(): void {
  }

  sesionInciada(){
    if (localStorage.getItem("current")==null || localStorage.getItem("current")=="") {
      this.ruta.navigateByUrl('login');
    } else {
      this.dataUser = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))
      this.peticion.obtenerPerfilCurrent(this.dataUser.user).subscribe(
        (res)=>{
          this.cargarInterface = true
          this.usercurrent = res[0];
          this.completarDatos(this.usercurrent)
          if (res==null || res=="") {
            this.ruta.navigateByUrl('login');
          }
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }
  convetirMinuscula(data:string){
    return data.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
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

  completarDatos(data:userCurrent) {
    this.crearFormulario.controls['tipoPersonal'].setValue('30')
    this.crearFormulario.controls['dni'].setValue(data.id_card_number_staff)
    this.crearFormulario.controls['nombre'].setValue(data.name_staff)
    this.crearFormulario.controls['apellidoP'].setValue(data.firts_name_staff)
    this.crearFormulario.controls['apellidoM'].setValue(data.last_name_staff)
    this.crearFormulario.controls['correo'].setValue(data.email_staff)
    this.crearFormulario.controls['celular'].setValue(data.phone_number_staff)
    //desabilidar campos
    this.crearFormulario.controls.tipoPersonal.disable()
    this.crearFormulario.controls.dni.disable()
    this.crearFormulario.controls.nombre.disable()
    this.crearFormulario.controls.apellidoP.disable()
    this.crearFormulario.controls.apellidoM.disable()
  }

  onFile(event) {

    let dni = this.crearFormulario.value.dni
    let nombre = this.crearFormulario.value.nombre
    let correo = this.crearFormulario.value.correo

    if (dni!="" || nombre!="" || correo!="") {

      const file = event.target.files[0];
      const ruta = 'staffPhotos/'+this.crearFormulario.value.dni;
      const ref = this.storageFire.ref(ruta);
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

  //variable contador
  c:number = 0
  opcion (){
    if (this.c == 0) {
      this.op = "data-pass"
      this.c = 1
    } else {
      this.op = "data-personal"
      this.c = 0
    }
  }

}
