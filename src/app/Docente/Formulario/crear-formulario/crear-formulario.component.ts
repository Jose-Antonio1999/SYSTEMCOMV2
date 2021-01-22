import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Area } from 'src/app/clases/Area';
import { TipoPregunta } from 'src/app/clases/TipoPregunta';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';
import { Formulario } from '../../../clases/formulario';


@Component({
  selector: 'app-crear-formulario',
  templateUrl: './crear-formulario.component.html',
  styleUrls: ['./crear-formulario.component.css']
})
export class CrearFormularioComponent implements OnInit {

  tamanioTexto: Number = 0;
  dataUser:Usuario
  usercurrent:userCurrent
  Formulario: Formulario
  contadorCampo: number
  formularioCampos:FormGroup;
  vista:boolean = false
  id_docente_tutor:number;
  listArea: Array<Area> = new Array<Area>();
  cargaEnvio:boolean = false;
  listaTipo: Array<TipoPregunta> = new Array<TipoPregunta>();

  constructor(
    private formbuilder:FormBuilder,
    private peticion:PeticionService,
    private ruta:Router,
    private storage:StorageService
  ) {
    //verificar sesion iniciada
    this.sesionInciada();
    //crear formulario
    this.crearFormulario();
    //lista del tipo del area del formulario
    this.listaArea();
    this.listarTipoPregunta();
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
            //si se accedio eliminar la data guardada
            console.log("no es tutor")
          } else {
            this.vista = true
            this.usercurrent = res[0];
            this.id_docente_tutor = this.usercurrent.id_teacher_tutor
          }
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }

  crearFormulario(){
    this.formularioCampos =  this.formbuilder.group({
      titulo:['Campo de tutoría',[Validators.required]],
      descripcion:['',Validators.required],
      areaTutoria:['',Validators.required],
      preguntas: this.formbuilder.array([
        this.formbuilder.group({
          pregunta: ['', [Validators.required]],
          tipo:['',[Validators.required]] })
      ])
    })
  }

  get obtenerPreguntas():FormArray{
    return <FormArray>this.formularioCampos.get('preguntas')
  }

  aniadirCampo(){
    const control = this.formbuilder.group({ pregunta: ['',[Validators.required]], tipo:['',Validators.required] })
    this.obtenerPreguntas.push(control)
  }

  enviar(){
    //crear nuevo campo formulario
    this.formularioCampos.addControl('id_docente_tutor', new FormControl(this.id_docente_tutor, Validators.required));
    this.cargaEnvio = true;
    console.log(this.formularioCampos.value)
    this.peticion.enviarFormulario(this.formularioCampos.value).subscribe(
      (res)=>{
        console.log(res)
        if (res=="1"){
          setTimeout(() => {
            this.cargaEnvio = false
          }, 1000);
          this.peticion.mensaje("Formulario enviado correctamente",4500,'center','center');
          this.cancelarEnvio();
        } else{
          this.peticion.mensaje(res,4500,'center','center');
          this.cargaEnvio = false
        }
      },
      (error)=>{
        console.log(error)
        this.cargaEnvio = false
      }
    )
  }

  eliminarCampo(i:number){
    this.obtenerPreguntas.removeAt(i)
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
  verificarLogDescripcion(){
    this.tamanioTexto = this.formularioCampos.value.descripcion.length
    if (this.tamanioTexto>390) {
      this.peticion.mensaje("Cantidad de carácteres exedidos",3500,'center','center')
    }
  }
  cancelarEnvio(){
    //resetear formulario
    this.formularioCampos.reset()
    this.formularioCampos.removeControl('id_docente_tutor');
    //poner le valor de longitud de texto cero
    this.tamanioTexto = 0;
  }


}
