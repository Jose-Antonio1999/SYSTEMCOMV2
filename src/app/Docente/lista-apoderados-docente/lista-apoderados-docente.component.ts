import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';
import { General } from '../../clases/studentGeneral'

@Component({
  selector: 'app-lista-apoderados-docente',
  templateUrl: './lista-apoderados-docente.component.html',
  styleUrls: ['./lista-apoderados-docente.component.css']
})
export class ListaApoderadosDocenteComponent implements OnInit {
  estadoMenu:String = "stateOne"
  stateIcon:string = "hiddenIcon"
  animateLetter:string  = "stateNormal"
  dataUser:Usuario
  usercurrent:userCurrent
  verMenu:boolean = false
  listaData = new  Array<General>()
  //variables para la busqueda
  dnibuscar:string
  constructor(
    private ruta:Router,
    private spinner:NgxSpinnerService,
    private peticion:PeticionService,
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
      this.dataUser = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))
      this.peticion.obtenerPerfilCurrentDocente(this.dataUser.user).subscribe(
        (res)=>{
          this.verMenu = true
          this.usercurrent = res[0];
          // pasar el grado y seccion para la data alumno
          this.dataStudent(this.usercurrent.grade,this.usercurrent.section,this.usercurrent.id_staff)
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

  dataStudent(grade:string, section:string,id:number){
    const data = {grado:grade,seccion:section,idTutor:id}
    this.peticion.listaDataStudent(data).subscribe(
      (res)=>{
        this.listaData = res as any
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  convetirMinuscula(data:string){
    return data.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
  }

  buscarApoderado() {
    console.log(this.dnibuscar)
  }

  comunicado(){
    const data = {
      'opcion':1,
      'grado':this.usercurrent.grade,
      'secion':this.usercurrent.section,
      'emailDocente': this.usercurrent.email_staff,
      'data':''};
    localStorage.setItem('comunicado',this.storage.encrypt(data));
  }
  comunicadoEspecifico(correo:String){
    const data = {
      'opcion':0,
      'grado':this.usercurrent.grade,
      'secion':this.usercurrent.section,
      'emailDocente': this.usercurrent.email_staff,
      'data':correo
    };
    localStorage.setItem('comunicado',this.storage.encrypt(data));
  }

}
