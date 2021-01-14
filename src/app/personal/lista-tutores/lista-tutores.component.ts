import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalAsignarTutorComponent } from 'src/app/modals/modal-asignar-tutor/modal-asignar-tutor.component';
import { PeticionService } from 'src/app/service/peticion.service';
import { catchError, retry } from 'rxjs/operators';
import { Tutor } from '../../clases/tutor';
import { VistaImagenUserComponent } from 'src/app/modals/vista-imagen-user/vista-imagen-user.component';

@Component({
  selector: 'app-lista-tutores',
  templateUrl: './lista-tutores.component.html',
  styleUrls: ['./lista-tutores.component.css']
})
export class ListaTutoresComponent implements OnInit {
  listadocentesTutores: Array<Tutor>
  listadocentesTutoresAsig: Array<Tutor>
  constructor(
    public dialog: MatDialog,
    private peticion:PeticionService
    ) {
      this.listaData()
      this.listatutoresAsignados();
    }

  ngOnInit(): void {
  }

  openModalasignacion(idDocente:number, grado:string, seccion:string, status_mentor:number){
    const data_staff = {id_docente:idDocente, grado:grado, seccion: seccion, estatus:status_mentor}
    const dialogRef  = this.dialog.open(ModalAsignarTutorComponent,{data:data_staff});
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        this.listaData ();
        this.listatutoresAsignados();
      }
    });
  }

  listaData () {
    this.peticion.listaStafftutores().subscribe(
      (res)=>{
        this.listadocentesTutores = res as any
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  convetirMinuscula(data:string){
    return data.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
  }

  estadoTutor(data:string):string{
    let value = ""
    if (data == "1") {
      value = "Habilitado"
    }
    if (data == "0") {
      value = "Desabilitado"
    }
    return value;
  }

  mostrarImgUser(i:number){

    const info = {
      photo: this.listadocentesTutoresAsig[i].path_photo_staffs,
      nombre: this.listadocentesTutoresAsig[i].name_staff,
      apellidoP: this.listadocentesTutoresAsig[i].firts_name_staff,
      apellidoM: this.listadocentesTutoresAsig[i].last_name_staff
    }

    const dialogRef  = this.dialog.open(VistaImagenUserComponent,{data:info});
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        console.log("cerro")
      }
    });

  }

  mostrarImgUserSingAgisnar(i:number){

    const info = {
      photo: this.listadocentesTutores[i].path_photo_staffs,
      nombre: this.listadocentesTutores[i].name_staff,
      apellidoP: this.listadocentesTutores[i].firts_name_staff,
      apellidoM: this.listadocentesTutores[i].last_name_staff
    }

    const dialogRef  = this.dialog.open(VistaImagenUserComponent,{data:info});
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        console.log("cerro")
      }
    });

  }

  listatutoresAsignados() {
    this.peticion.listaTutoresAsignados().subscribe(
      (res)=>{
        this.listadocentesTutoresAsig = res as any
      },
      (error)=>{
        console.log(error)
      }
    )
  }

}
