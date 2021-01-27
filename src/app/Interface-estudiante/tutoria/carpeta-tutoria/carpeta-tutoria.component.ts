import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Formulario } from 'src/app/models/forms';
import { Student } from 'src/app/clases/student';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { FormularioServiceService } from 'src/app/service/formulario-service.service';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';
import { Question } from 'src/app/models/question';

interface FormsIdentificador{
  id_form:number
}

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
  vistaForm:boolean = false
  idAlumno:number
  //array de  ID respondidos
  listFormsRespondidos: Array<FormsIdentificador>
  vistaModal:boolean = true
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
            this.idAlumno = this.usercurrent.id_student
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

  cargarFormulario(datos:Student) {
    const data = {id_grado:datos.id_grade2, id_seccion:datos.id_section1}
    this.peticionForm.listaFormulario(data).subscribe(
      (res)=>{
        this.listaFormulario = res
        if (this.listaFormulario.length==0) {
          this.vistaForm = true
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  verificarFomularioRespondido(idForm:number, i:number):number{
    let resultado;
    const data = {'id_form':idForm,'id_student':this.idAlumno};
    this.peticionForm.formularioRespondido(data).subscribe(
      (res)=>{
        this.listFormsRespondidos = res
        resultado = res.length
        if(resultado==0) {
          this.obtenerPreguntas(idForm,i)
          this.vistaModal = true
        } else {
          this.listaPreguntas = []
          this.vistaModal = false
        }
      },
      (error)=>{
        console.log(error)
      }
    )
    return resultado;
  }

  tituloFormulario:String
  obtenerPreguntas(idForm:number, i:number){

    this.tituloFormulario = this.listaFormulario[i].title
    //hacer peticion
    this.peticionForm.listaQuestion(idForm).subscribe(
      (res)=>{
        this.listaPreguntas = res
        this.aniadirCampo(this.listaPreguntas.length)
        //this.asignarIdpregunta(this.listaPreguntas)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  crearformularioRespuesta(){
    this.formularioRespuesta =  this.formbuilder.group({
      id_alumno:['',[Validators.required]],
      respuestas: this.formbuilder.array([
        this.formbuilder.group({
          id_pregunta: ['', [Validators.required]],
          respuesta:['',[Validators.required]] })
      ])
    })
  }

  guardarRespuestas(){
    //cargar id de alumno antes de envio
    this.formularioRespuesta.value.id_alumno = this.idAlumno
    this.asignarIdpregunta(this.listaPreguntas)
    this.peticionForm.sendAnswer(this.formularioRespuesta.value).subscribe(
      (res)=>{
        this.peticion.mensaje("Formulario registrado correctamente",4500,'center','center')
        //reset de formulario y crear un nuevo formulario
        this.formularioRespuesta.reset();
        this.crearformularioRespuesta();
      },
      (error)=>{
        console.log(error);
      }

    )
  }

  get obtenerlistaPreguntas():FormArray{
    return <FormArray>this.formularioRespuesta.get('respuestas')
  }

  aniadirCampo(cant:number){
    let i:number = 1;
    while (i<cant) {
      const control = this.formbuilder.group({ id_pregunta: ['',[Validators.required]], respuesta:['',Validators.required] })
      this.obtenerlistaPreguntas.push(control)
      i = i + 1;
    }
  }

  asignarIdpregunta(lista:Array<Question>){
    let i:number = 0
    while (i<lista.length) {
      this.formularioRespuesta.get('respuestas').value[i].id_pregunta = lista[i].id_questions
      i = i + 1
    }
  }

  cancelar() {
    //reset de formulario y crear un nuevo formulario
    this.formularioRespuesta.reset();
    this.crearformularioRespuesta();
  }


}
