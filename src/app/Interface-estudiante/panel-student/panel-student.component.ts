import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/clases/student';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-panel-student',
  templateUrl: './panel-student.component.html',
  styleUrls: ['./panel-student.component.css']
})
export class PanelStudentComponent implements OnInit {
  @ViewChild('passw',{static:false}) passw:ElementRef
  verPass:boolean = false

  dataUser:Usuario
  usercurrent: Student
  cargarInterface:boolean = false
  crearFormulario:FormGroup;
  crearFormulariosocial:FormGroup;
  crearFormulariopass:FormGroup;
  crearFormularioPhoto:FormGroup;
  imgURL:String
  barraCarga:boolean = false
  verCargaPhoto:boolean = false
  porcentajeSubidaFoto:number = 0
  op:string = 'data-personal'
  refGrado:String
  constructor(
    private peticion:PeticionService,
    private ruta:Router,
    private storage:StorageService,
    private formbuilder:FormBuilder,
    private storageFire: AngularFireStorage
  ) {
    this.sesionInciada();
    this.formularioDatosElectronicos();
    this.formularioPassword();
    this.crearformularioFoto();
  }

  ngOnInit(): void {
  }

  sesionInciada(){
    if (localStorage.getItem("current")==null || localStorage.getItem("current")=="") {
      this.ruta.navigateByUrl('login');
    } else {
      this.dataUser = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))
      this.peticion.obtenerPerfilStudent(this.dataUser.DNI).subscribe(
        (res)=>{

          if (res==null || res=="") {
            console.log("no es es tutor")
          } else {
            this.cargarInterface = true
            this.usercurrent = res[0];
            this.refGrado = this.peticion.gradoSegunName(this.usercurrent.grade)
            // this.completarDatos(this.usercurrent)
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

  formularioDatosElectronicos(){
    this.crearFormulariosocial = this.formbuilder.group({
      email:['',[Validators.required,Validators.email]]
    })

  }

  formularioPassword(){
    this.crearFormulariopass = this.formbuilder.group({
      pass1:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]],
      pass2:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]]
    })

  }

  crearformularioFoto(){
    this.crearFormularioPhoto = this.formbuilder.group({
      photo:['',Validators.required]
    })
  }

  completarDatos(data:userCurrent) {
    this.crearFormulariosocial.controls['email'].setValue(data.email_staff)
    this.crearFormulariosocial.controls['celular'].setValue(data.phone_number_staff)
  }

  onFile(event) {

    let dni = this.usercurrent.DNI_student
    this.crearFormularioPhoto.controls.photo.disable()

    if (dni!="") {

      const file = event.target.files[0];
      const ruta = 'studentPhotos/'+dni;
      const ref = this.storageFire.ref(ruta);
      const task = ref.put(file);

      //verificamos mientras se sube la foto
      task.then((tarea)=>{
          ref.getDownloadURL().subscribe((imgUrl)=>{
          this.imgURL = imgUrl
          this.verCargaPhoto = true
          this.peticion.mensaje("Foto de perfil cambiada correctamente",4500,'center','center');
          this.restablecerDatosPhoto()
          })
      })
       //observale de la subida del archivo en %
      task.percentageChanges().subscribe((porcentaje)=>{
          this.barraCarga = true
          this.porcentajeSubidaFoto = parseInt(porcentaje.toString(),10)
      })
    } else {
      this.peticion.mensaje("Error al cambiar la foto de perfil",3500,'center','center')
    }

  }

  restablecerDatosPhoto(){
    this.actualizarData();
    this.usercurrent.path_photo_students = this.imgURL
    this.crearFormularioPhoto.controls.photo.enable()
    this.crearFormularioPhoto.controls['photo'].setValue('')
    this.barraCarga = false
    this.porcentajeSubidaFoto = 0
    this.opsw = "vista"
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

  opsw:string = "vista"
  swVista(data:string){
    this.opsw = data
  }

  verPassw(){
    this.passw.nativeElement.type = "text"
    this.verPass = true
  }

  noPassw(){
    this.passw.nativeElement.type = "password"
    this.verPass = false
  }

  guardarSocialData(){
    //crear un campo antes de enviar comunicaso
    this.crearFormulariosocial.addControl('id_card_number', new FormControl(this.usercurrent.DNI_student, Validators.required));
    this.peticion.updateSocialDataStudent(this.crearFormulariosocial.value).subscribe(
      (res)=>{
        this.peticion.mensaje(res,5000,'center','center')
        this.opsw ="vista"
        this.crearFormulariosocial.reset();
        this.actualizarData();
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  guardarPassword(){
    if(this.crearFormulariopass.value.pass1==this.crearFormulariopass.value.pass2) {
      //crear un campo antes de enviar comunicaso
      this.crearFormulariopass.addControl('DNI', new FormControl(this.usercurrent.DNI_student, Validators.required));
      this.crearFormulariopass.addControl('profile', new FormControl(this.dataUser.profile, Validators.required));
      this.peticion.updatePassword(this.crearFormulariopass.value).subscribe(
        (res)=>{
          console.log(res)
          this.peticion.mensaje(res,4500,'center','center')
          this.crearFormulariopass.removeControl('DNI')
          this.crearFormulariopass.removeControl('profile')
          this.opsw = "vista"
          this.crearFormulariopass.reset()
        },
        (error)=>{
          console.log(error)
        }
      )
    } else {
      this.peticion.mensaje("Las contraseñas no coinciden",4500,'center','center');
    }
  }

  actualizarData(){
    this.peticion.obtenerPerfilStudent(this.dataUser.DNI).subscribe(
      (res)=>{
        if (res==null || res=="") {
          console.log("no es es tutor")
        } else {
          this.usercurrent = res[0];
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }
}
