import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';
import { Staff } from '../../clases/staff'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertasComponent } from 'src/app/modals/alertas/alertas.component';
import { EditarPersonalComponent } from 'src/app/modals/editar-personal/editar-personal.component';

@Component({
  selector: 'app-configuracion-personal',
  templateUrl: './configuracion-personal.component.html',
  styleUrls: ['./configuracion-personal.component.css']
})
export class ConfiguracionPersonalComponent implements OnInit {
  @ViewChild('passw',{static:false}) passw:ElementRef
  verPass:boolean = false

  listaStaff: Array<Staff>
  usuarioActual:Usuario
  usercurrent: userCurrent
  cargarInterface:boolean = false
  barraCarga:boolean = false
  verCargaPhoto:boolean = false
  imgURL:String
  porcentajeSubidaFoto:number = 0
  formularioEditar:FormGroup
  crearFormulariosocial:FormGroup
  crearFormulariopass:FormGroup
  crearFormularioPhoto:FormGroup
  nombrePersonal:string
  estadoStatus:number = 0;
  constructor(
    private peticion:PeticionService,
    private ruta:Router,
    private storage:StorageService,
    private formbuilder:FormBuilder,
    private storageFire: AngularFireStorage,
    public dialog: MatDialog,
  ) {
    this.llenarListastaff();
    this.sesionInciada();
    this.crearFomularioEdit();
    this.formularioDatosElectronicos();
    this.formularioPassword();
    this.crearformularioFoto();
  }

  ngOnInit(): void {
  }

  formularioDatosElectronicos(){
    this.crearFormulariosocial = this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      celular:['',[Validators.required,Validators.minLength(9),Validators.pattern(/^([0-9])*$/)]]
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

  onFile(event) {

    let dni = this.usercurrent.id_card_number_staff

    if (dni!="") {

      const file = event.target.files[0];
      const ruta = 'staffPhotos/'+dni;
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
      this.peticion.mensaje("ERROR al subir la foto",3500,'center','center')
      this.formularioEditar.controls['photo'].setValue('')
    }

  }

  restablecerDatosPhoto(){
    this.actualizarData();
    this.usercurrent.path_photo_staffs = this.imgURL
    this.crearFormularioPhoto.controls.photo.enable()
    this.crearFormularioPhoto.controls['photo'].setValue('')
    this.barraCarga = false
    this.porcentajeSubidaFoto = 0
    this.opsw = "vista"
  }

  llenarListastaff(){
    this.peticion.listaStaff().subscribe(
      (res)=>{
        this.listaStaff = res as any
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  crearFomularioEdit(){
    this.formularioEditar = this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      celular:['',[Validators.required,Validators.minLength(9),Validators.pattern(/^([0-9])*$/)]],
      password:['',[Validators.required,Validators.minLength(8)]],
      password2:['',[Validators.required,Validators.minLength(8)]],
      photo:[''],
      oldPass:['',[Validators.required]]
    })
  }

  estadoUser(i:number):String{
    let status = "estado"
    if (i==1) {
      status = "Habilitado"
    }
    if (i==0) {
      status = "Desabilitado"
    }
    return status;
  }

  convetirMinuscula(data:string){
    return data.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
  }

  cargarData(){
    this.formularioEditar.controls['email'].setValue(this.usercurrent.email_staff)
    this.formularioEditar.controls['celular'].setValue(this.usercurrent.phone_number_staff)
  }

  sesionInciada(){
    if (localStorage.getItem("current")==null || localStorage.getItem("current")=="") {
      this.ruta.navigateByUrl('login');
    } else {
      this.usuarioActual = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))
      this.peticion.obtenerPerfilCurrent(this.usuarioActual.DNI).subscribe(
        (res)=>{
          if (res==null || res=="") {
            this.ruta.navigateByUrl('login');
          } else {
            this.cargarInterface = true
            this.usercurrent = res[0];
            this.completarDatos(this.usercurrent)
          }
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }

  estadoPersonal(idP:number, user:string,i:number,estadocurrect:number) {

    if (estadocurrect==0) {
      this.listaStaff[i].status_staff = this.estadoStatus
      this.listaStaff[i].status_staff = '1'
      //data a enviar
      const data = {'id_personal':idP,'email':user,'estado':1}

      this.peticion.statusStaff(data).subscribe(
        (res)=>{
          console.log(res)
          this.peticion.mensaje('Personal habilitado',4500,'center','center')
        },
        (error)=>{
          console.log(error)
        }
      )

    }

    if (estadocurrect==1){

      this.listaStaff[i].status_staff = '0'
      //data  enviar
      const data = {'id_personal':idP,'email':user,'estado':0}

      this.peticion.statusStaff(data).subscribe(
        (res)=>{
          console.log(res)
          this.peticion.mensaje('Personal desabilitado',4500,'center','center')
        },
        (error)=>{
          console.log(error)
        }
      )

    }

  }

  openMenssaje() {
    const dialogRef  = this.dialog.open(AlertasComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        console.log("cerro")
      }
    });
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
    this.crearFormulariosocial.addControl('id_card_number', new FormControl(this.usercurrent.id_card_number_staff, Validators.required));
    this.peticion.updateSocialData(this.crearFormulariosocial.value).subscribe(
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
      this.crearFormulariopass.addControl('DNI', new FormControl(this.usercurrent.id_card_number_staff, Validators.required));
      this.crearFormulariopass.addControl('profile', new FormControl(this.usuarioActual.profile, Validators.required));
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

  completarDatos(data:userCurrent) {
    this.crearFormulariosocial.controls['email'].setValue(data.email_staff)
    this.crearFormulariosocial.controls['celular'].setValue(data.phone_number_staff)
  }

  actualizarData() {
    this.peticion.obtenerPerfilCurrent(this.usuarioActual.DNI).subscribe(
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

  //modal para editar
  modalEditarPersonal(i:number) {
    const dialogRef  = this.dialog.open(EditarPersonalComponent,{data:this.listaStaff[i]});
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        this.llenarListastaff();
      }
      if (result==true) {
        this.llenarListastaff();
      }
    });
  }

}
