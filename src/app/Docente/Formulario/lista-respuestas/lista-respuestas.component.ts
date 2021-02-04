import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Area } from 'src/app/clases/Area';
import { General } from 'src/app/clases/studentGeneral';
import { TipoPregunta } from 'src/app/clases/TipoPregunta';
import { Tutor } from 'src/app/clases/tutor';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { Respuesta } from 'src/app/clases/respuesta';
import { Formulario } from 'src/app/models/forms';
import { Question } from 'src/app/models/question';
import { FormularioServiceService } from 'src/app/service/formulario-service.service';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-lista-respuestas',
  templateUrl: './lista-respuestas.component.html',
  styleUrls: ['./lista-respuestas.component.css']
})
export class ListaRespuestasComponent implements OnInit {

  listaPersonal:Array<number>
  estadoMenu:String = "stateOne"
  stateIcon:string = "hiddenIcon"
  animateLetter:string  = "stateNormal"
  dataUser:Usuario
  tutor:Tutor
  verMenu:boolean = false
  listaData = new  Array<General>()
  //variable de busqueda
  usuarioDocente:Usuario
  usercurrent:userCurrent
  id_docente_tutor:number
  datatutor:String = ""
  Formularios:Array<Formulario>
  listArea: Array<Area> = new Array<Area>();
  cargaEnvio:boolean = false;
  listaTipo: Array<TipoPregunta> = new Array<TipoPregunta>();
  constructor(
    private formbuilder:FormBuilder,
    private peticion:PeticionService,
    private ruta:Router,
    private storage:StorageService,
    private peticionFormulario:FormularioServiceService
  ) {
    this.sesionInciada();
    this.viewFormulario();
    this.listaArea();
    this.listarTipoPregunta();
  }

  ngOnInit(): void {
  }
  sesionInciada(){
    if (localStorage.getItem("current")==null || localStorage.getItem("current")=="") {
      this.ruta.navigateByUrl('login');
    } else {
      this.usuarioDocente = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))
      this.peticion.obtenerTutor(this.usuarioDocente.DNI).subscribe(
        (res)=>{
          if (res==null || res=="") {
            //si se accedio eliminar la data guardada
          } else {
            this.usercurrent = res[0];
            //data para mostrar al imprimir lista formularios
            this.datatutor = "Tutor(a): "+this.usercurrent.name_staff+" "+this.usercurrent.firts_name_staff+" "+this.usercurrent.last_name_staff
            this.id_docente_tutor = this.usercurrent.id_teacher_tutor
            //lsitar formularios
            this.listaFormularios();
          }
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }

  formularioCampos:FormGroup
  viewFormulario(){
    this.formularioCampos =  this.formbuilder.group({
      titulo:['Campo de tutoría',[Validators.required]],
      descripcion:['',Validators.required],
      areaTutoria:['',Validators.required]
    })
  }

  vistaVacia:boolean = false
  listaFormularios() {
    this.peticionFormulario.listaFormularioDocente(this.id_docente_tutor).subscribe(
      (res)=>{
        this.Formularios = res
        if (this.Formularios.length==0) {
          this.vistaVacia = true
        } else{
          this.vistaVacia = false
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  listaArea(){
    this.peticion.listaArea().subscribe(
      (res)=>{
        this.listArea = res;
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  listarTipoPregunta() {
    this.peticion.listaTipoPregunta().subscribe(
      (res)=>{
        this.listaTipo= res;
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  areas(num:number):String{
    let area:String;
    if(num==1){
      area = "Área Personal Social";
    }
    if(num==2){
      area = "Área Académica";
    }
    if(num==3){
      area = "Área Vocacional";
    }
    if(num==4){
      area = "Área de Salud Corporal y Mental";
    }
    if(num==5){
      area = "Área de Ayuda Social";
    }
    return area;
  }

  vistaEstado(i:number):String{
    let status = "estado"
    if (i==1) {
      status = "Habilitado"
    }
    if (i==0) {
      status = "Desabilitado"
    }
    return status;
  }

  estadoFormulario(idForm:number, estadocurrect:number,i:number) {

    if (estadocurrect==0) {
      this.Formularios[i].status = 1
      //data a enviar
      const data = {'id_form':idForm,'estado':1}

      this.peticionFormulario.estadoFormualrio(data).subscribe(
        (res)=>{
          this.peticion.mensaje('Formulario habilitado',4500,'center','center')
        },
        (error)=>{
          console.log(error)
        }
      )

    }
    else {
      this.Formularios[i].status = 0
      const data = {'id_form':idForm,'estado':0}

      this.peticionFormulario.estadoFormualrio(data).subscribe(
        (res)=>{
          this.peticion.mensaje('Formulario desahabilitado',4500,'center','center')
        },
        (error)=>{
          console.log(error)
        }
      )

    }

  }
  vistaForm:String = 'lista'
  opcionVista(op:String){
    this.vistaForm = op
    this.vistaLista = false
    this.vistaListasuccess = false
    this.listaPreguntas.length = 0
    this.datoForm = "Respuestas"
  }

  listaPreguntas:Array<Question>
  obtenerPreguntas(idForm:number){
    //hacer peticion
    this.peticionFormulario.listaQuestion(idForm).subscribe(
      (res)=>{
        this.listaPreguntas = res
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  vistaFormulario:Formulario
  id_fomulario:number
  datoForm:String = "Respuestas"
  mandarRespuestas(i:number,idForm:number,vista:String){
    this.vistaForm = 'vista'
    this.id_fomulario = idForm
    this.vistaFormulario = this.Formularios[i]
    this.datoForm  = this.Formularios[i].title
    //cargar preguntas
    this.dataStudent(this.usercurrent.grade, this.usercurrent.section, this.usercurrent.id_staff);
  }
  //data estudiantes
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

  listaRespuestas:Array<Respuesta>
  vistaLista:boolean = false
  vistaListasuccess:boolean = false
  estudiante:string
  verRespuestaAlumno(indiceAlumno:number){
    const data = {'id_alumno':this.listaData[indiceAlumno].id_student,'id_form':this.id_fomulario}
    this.peticion.obtenerRespuesta(data).subscribe(
      (res)=>{
        this.listaPreguntas = res
        if(this.listaPreguntas.length==0){
          this.vistaLista = true
          this.vistaListasuccess = false
          this.estudiante = this.listaData[indiceAlumno].name_student+" "+this.listaData[indiceAlumno].firts_name_student+" "+this.listaData[indiceAlumno].last_name_student
        } else {
          this.vistaLista = false
          this.vistaListasuccess = true
          this.estudiante = this.listaData[indiceAlumno].name_student+" "+this.listaData[indiceAlumno].firts_name_student+" "+this.listaData[indiceAlumno].last_name_student
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  verificarURL(data:any){
    return /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(data);
  }


}
