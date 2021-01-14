import { Component, Inject, OnInit } from '@angular/core';
import { Grado } from 'src/app/clases/grado';
import { Seccion } from 'src/app/clases/seccion';
import { PeticionService } from 'src/app/service/peticion.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-asignar-tutor',
  templateUrl: './modal-asignar-tutor.component.html',
  styleUrls: ['./modal-asignar-tutor.component.css']
})
export class ModalAsignarTutorComponent implements OnInit {

  listaSecciones: Array<Seccion>
  listaGrados: Array<Grado>
  formulario:FormGroup
  vistaMensaje:boolean = false
  constructor(
    private peticion:PeticionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formbuilder:FormBuilder
    ) {

    this.crearFormulario();
    this.listaSeccion();
    this.listaGrado();
    this.completarCampos();

  }

  crearFormulario(){
    this.formulario = this.formbuilder.group({
      id:[this.data.id_docente],
      grado:['',[Validators.required]],
      seccion:['',[Validators.required]],
      estatus:[this.data.estatus]
    })
  }

  ngOnInit(): void {
  }

  guardarCambios(){
    this.peticion.registroTutor(this.formulario.value).subscribe(
      (res)=>{
        console.log(res)
        this.peticion.mensaje(res,4500,'center','center')
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  listaSeccion(){
    this.peticion.listaGrado().subscribe(
      (res)=>{
        this.listaGrados = res
      }
    )
  }
  listaGrado(){
    this.peticion.listaSecction().subscribe(
      (res)=>{
        this.listaSecciones = res
      }
    )
  }

  completarCampos() {
    console.log(this.data)
    if (this.data.seccion != null && this.data.grado != null) {
      this.vistaMensaje = true
    }
    if (this.data.estatus == 3) {
      this.vistaMensaje = false
    }
  }

  desasignar() {
    this.peticion.desasignarTuor(this.formulario.value).subscribe(
      (res)=>{
        console.log(res)
        this.peticion.mensaje("Docente desasignado correctamente",4500,'center','center')
      },
      (error)=>{
        console.log(error)
      }
    )
  }

}
