import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel-comunicado',
  templateUrl: './panel-comunicado.component.html',
  styleUrls: ['./panel-comunicado.component.css']
})
export class PanelComunicadoComponent implements OnInit {

  formulalrioComunicado:FormGroup
  constructor(private formbuilder:FormBuilder) {
    this.crearFomulario();
  }

  ngOnInit(): void {
  }

  crearFomulario(){
    this.formulalrioComunicado = this.formbuilder.group({
      idEnvio:[''],
      tipo:['',Validators.required],
      para:['',Validators.required],
      asunto:['',Validators.required],
      cuerpo:['',Validators.required],
      pass:['',Validators.required]
    })
  }

}
