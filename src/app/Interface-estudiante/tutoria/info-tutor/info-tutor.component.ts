import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Student } from 'src/app/clases/student';
import { Usuario } from 'src/app/clases/usuario';
import { userCurrent } from 'src/app/clases/user';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-info-tutor',
  templateUrl: './info-tutor.component.html',
  styleUrls: ['./info-tutor.component.css']
})
export class InfoTutorComponent implements OnInit {
  estudianteActivo:Usuario
  usercurrent:Student
  DataTutor:userCurrent
  vista:boolean = false
  constructor(
    private ruta:Router,
    private spinner:NgxSpinnerService,
    private peticion:PeticionService,
    public dialog: MatDialog,
    private storage:StorageService
  ) {
    this.sesionInciada();
  }

  ngOnInit(): void {
  }

  sesionInciada(){
    if (localStorage.getItem("current")==null || localStorage.getItem("current")=="") {
      this.ruta.navigateByUrl('login');
    } else {
      this.estudianteActivo = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))
      this.peticion.obtenerPerfilStudent(this.estudianteActivo.DNI).subscribe(
        (res)=>{
          if (res==null || res=="") {
            //si se accedio eliminar la data guardada
            localStorage.removeItem('current')
            this.peticion.mensaje('Acceso denegado',4500,'center','center')
            //mas aun redirigir a login
            this.ruta.navigateByUrl('login');
          } else {
            this.usercurrent = res[0];
            this.dataTutor(this.usercurrent.id_section1,this.usercurrent.id_grade2)
          }
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }

  dataTutor(seccion:String, grade:String){
    const data = {'seccion':seccion,'grade':grade}
    this.peticion.datosTutor(data).subscribe(
      (res)=>{
        this.DataTutor = res[0]
        this.vista = true
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  convetirMinuscula(data:string){
    return data.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
  }


}
