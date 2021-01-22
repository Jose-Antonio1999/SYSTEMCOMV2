import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Formulario } from 'src/app/clases/formulario';
import { Question } from 'src/app/clases/Question';
import { Student } from 'src/app/clases/student';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { FormularioServiceService } from 'src/app/service/formulario-service.service';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-carpeta-tutoria',
  templateUrl: './carpeta-tutoria.component.html',
  styleUrls: ['./carpeta-tutoria.component.css']
})
export class CarpetaTutoriaComponent implements OnInit {
  estudianteActivo:Usuario
  usercurrent:Student
  listaFormulario: Array<Formulario>
  listaPreguntas:Array<Question>
  formularioRespuesta:FormGroup
  constructor(
    private peticionForm: FormularioServiceService,
    private ruta:Router,
    private peticion:PeticionService,
    public dialog: MatDialog,
    private storage:StorageService,
    private formbuilder:FormBuilder
    ) {
    //verificar sesion
    this.sesionInciada();
  }

  ngOnInit(): void {
    //crear formulario
    this.crearformularioRespuesta();
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
            //cargar formulario
            this.cargarFormulario(this.usercurrent);
          }
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }

  crearformularioRespuesta(){
    this.formularioRespuesta = this.formbuilder.group({
      id_estudiante:['']
    })
  }

  cargarFormulario(datos:Student) {
    const data = {id_grado:datos.id_grade2, id_seccion:datos.id_section1}
    this.peticionForm.listaFormulario(data).subscribe(
      (res)=>{
        this.listaFormulario = res
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  tituloFormulario:String
  obtenerPreguntas(idForm:number,i:number){
    //obtener titulo
    this.tituloFormulario = this.listaFormulario[i].title
    //hacer peticion
    this.peticionForm.listaQuestion(idForm).subscribe(
      (res)=>{
        this.listaPreguntas = res
      },
      (error)=>{
        console.log(error)
      }
    )
  }



}
