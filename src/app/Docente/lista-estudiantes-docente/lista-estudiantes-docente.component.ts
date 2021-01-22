import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { General } from 'src/app/clases/studentGeneral';
import { Tutor } from 'src/app/clases/tutor';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-lista-estudiantes-docente',
  templateUrl: './lista-estudiantes-docente.component.html',
  styleUrls: ['./lista-estudiantes-docente.component.css']
})
export class ListaEstudiantesDocenteComponent implements OnInit {
  listaPersonal:Array<number>
  estadoMenu:String = "stateOne"
  stateIcon:string = "hiddenIcon"
  animateLetter:string  = "stateNormal"
  dataUser:Usuario
  tutor:Tutor
  verMenu:boolean = false
  listaData = new  Array<General>()
  //variable de busqueda
  nombreEstudiante:string
  mensajeVacio:boolean = false
  vistaInterface:boolean = true
  constructor
  (
    private ruta:Router,
    private spinner:NgxSpinnerService,
    private peticion:PeticionService,
    private storage:StorageService
  ) {
    this. sesionInciada()
  }

  ngOnInit(): void {
  }

  sesionInciada(){
    if (localStorage.getItem("current")==null || localStorage.getItem("current")=="") {
      this.ruta.navigateByUrl('login');
    } else {
      this.dataUser = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))

      this.peticion.obtenerTutor(this.dataUser.DNI).subscribe(
        (res)=>{

          if (res==null || res=="") {
            //si no es tutor bloquear o mostrar mensaje
            console.log("no es tutor")
            this.vistaInterface = false
          } else {
            // pasar el grado y seccion para la data alumno
            this.tutor = res[0];
            this.dataStudent(this.tutor.grade, this.tutor.section,this.tutor.id_staff)
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
        if(this.listaData.length==0){
          this.mensajeVacio = true
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  convetirMinuscula(data:string){
    return data.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
  }
  comunicadoEspecifico(correo:String){
    const data = {
      'opcion':0,
      'grado':this.tutor.grade,
      'secion':this.tutor.section,
      'emailDocente': this.tutor.email_staff,
      'data':correo
    };
    localStorage.setItem('comunicado',this.storage.encrypt(data));
  }
}
