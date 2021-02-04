import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Area } from 'src/app/clases/Area';
import { TipoPregunta } from 'src/app/clases/TipoPregunta';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { Formulario } from 'src/app/models/forms';
import { Question } from 'src/app/models/question';
import { FormularioServiceService } from 'src/app/service/formulario-service.service';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-mis-formularios',
  templateUrl: './mis-formularios.component.html',
  styleUrls: ['./mis-formularios.component.css']
})
export class MisFormulariosComponent implements OnInit {

  usuarioDocente:Usuario
  usercurrent:userCurrent
  id_docente_tutor:number
  Formularios:Array<Formulario>
  listArea: Array<Area> = new Array<Area>();
  cargaEnvio:boolean = false;
  listaTipo: Array<TipoPregunta> = new Array<TipoPregunta>();
  datatutor:String = ""
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
            console.log("no es tutor")
          } else {
            this.usercurrent = res[0];
            this.id_docente_tutor = this.usercurrent.id_teacher_tutor
            //guardar data para imprimir
            this.datatutor = "Tutor(a): "+this.usercurrent.name_staff+" "+this.usercurrent.firts_name_staff+" "+this.usercurrent.last_name_staff
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
  editarFormulario(i:number,vista:String){
    this.vistaForm = vista
    this.vistaFormulario = this.Formularios[i]
    //cargar formulario
    this.formularioCampos.controls['titulo'].setValue(this.vistaFormulario.title)
    this.formularioCampos.controls['descripcion'].setValue(this.vistaFormulario.description)
    this.formularioCampos.controls['areaTutoria'].setValue(this.vistaFormulario.id_area_tutorship1)
    //cargar preguntas
    this.obtenerPreguntas(this.vistaFormulario.id_form)
  }

  eliminarFormularios(idForm:number, i:number){
    this.peticionFormulario.eliminarFormulario(idForm).subscribe(
      (res)=>{
        this.Formularios.splice(i,1);
        if(this.Formularios.length==0){
          this.vistaVacia = true
        }
        this.peticion.mensaje(res,4500,'center','center')
      },
      (error)=>{
        console.log(error)
      }
    )
  }



}
