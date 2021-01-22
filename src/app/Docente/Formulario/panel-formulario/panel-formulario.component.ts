import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Tutor } from 'src/app/clases/tutor';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-panel-formulario',
  templateUrl: './panel-formulario.component.html',
  styleUrls: ['./panel-formulario.component.css']
})
export class PanelFormularioComponent implements OnInit {
  vistaInterface:boolean = true
  dataUser:Usuario
  tutor:Tutor
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

      this.peticion.obtenerTutor(this.dataUser.DNI).subscribe(
        (res)=>{

          this.tutor = res[0];

          if (res==null || res=="") {
            //si no es tutor bloquear o mostrar mensaje
            console.log("no es tutor")
            this.vistaInterface = false
          }

        },
        (error)=>{
          console.log(error)
        }
      )

    }
  }

}
