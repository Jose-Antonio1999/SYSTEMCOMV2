import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear-formulario',
  templateUrl: './crear-formulario.component.html',
  styleUrls: ['./crear-formulario.component.css']
})
export class CrearFormularioComponent implements OnInit {
  listaCampos = Array<any>()

  formularioCampos:FormGroup;
  constructor(
    private formbuilder:FormBuilder
  ) {
    this.crearFormulario();
    this.llenarValores();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formularioCampos = this.formbuilder.group({
      titulo:[''],
      descripcion:['']
    })
  }

  llenarValores () {
    this.formularioCampos.addControl('campo1', this.formbuilder.control(''))
    this.listaCampos.push(1)
  }
  enviar(){
    console.log(this.formularioCampos.value)
  }

}
