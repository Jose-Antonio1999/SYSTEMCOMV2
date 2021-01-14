import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';
import { Staff } from '../../clases/staff'
import { MatDialog } from '@angular/material/dialog';
import { AlertasComponent } from 'src/app/modals/alertas/alertas.component';

@Component({
  selector: 'app-configuracion-personal',
  templateUrl: './configuracion-personal.component.html',
  styleUrls: ['./configuracion-personal.component.css']
})
export class ConfiguracionPersonalComponent implements OnInit {
  listaStaff: Array<Staff>
  dataUser:Usuario
  usercurrent: userCurrent
  cargarInterface:boolean = false
  barraCarga:boolean = false
  verCargaPhoto:boolean = false
  imgURL:String
  porcentajeSubidaFoto:number = 0
  formularioEditar:FormGroup
  nombrePersonal:string
  estadoStatus:number = 0;
  constructor(
    private peticion:PeticionService,
    private ruta:Router,
    private storage:StorageService,
    private formbuilder:FormBuilder,
    private storageFire: AngularFireStorage,
    public dialog: MatDialog
  ) {
    this.llenarListastaff();
    this.sesionInciada();
    this.crearFomularioEdit();
  }

  ngOnInit(): void {
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
      this.dataUser = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))
      this.peticion.obtenerPerfilCurrent(this.dataUser.user).subscribe(
        (res)=>{
          this.cargarInterface = true
          this.usercurrent = res[0];
          console.log(this.usercurrent)
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

  estadoPersonal(idP:number, user:string,i:number,estadocurrect:number) {

    if (estadocurrect==0) {
      this.listaStaff[i].status_staff = this.estadoStatus
      this.listaStaff[i].status_staff = '1'
      //data a enviar
      const data = {'id_personal':idP,'email':user,'estado':1}

      this.peticion.statusStaff(data).subscribe(
        (res)=>{
          console.log(res)
          this.peticion.mensaje('Habilitado',4500,'center','center')
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
          this.peticion.mensaje('Desabilitado',4500,'center','center')
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

}
