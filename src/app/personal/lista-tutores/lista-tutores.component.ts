import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalAsignarTutorComponent } from 'src/app/modals/modal-asignar-tutor/modal-asignar-tutor.component';
import { PeticionService } from 'src/app/service/peticion.service';
import { catchError, retry } from 'rxjs/operators';
import { Tutor } from '../../clases/tutor';

@Component({
  selector: 'app-lista-tutores',
  templateUrl: './lista-tutores.component.html',
  styleUrls: ['./lista-tutores.component.css']
})
export class ListaTutoresComponent implements OnInit {
  listadocentesTutores: Array<Tutor>
  constructor(
    public dialog: MatDialog,
    private peticion:PeticionService
    ) {
      this.listaData()
    }

  ngOnInit(): void {
  }

  openModalasignacion(idDocente:number){
    const dialogRef  = this.dialog.open(ModalAsignarTutorComponent,{data:idDocente});
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        this.listaData ();
      }
    });
  }

  listaData () {
    this.peticion.listaStafftutores().subscribe(
      (res)=>{
        this.listadocentesTutores = res as any
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  convetirMinuscula(data:string){
    return data.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
  }

  estadoTutor(data:string):string{
    let value = ""
    if (data == "1") {
      value = "Habilitado"
    }
    if (data == "0") {
      value = "Desabilitado"
    }
    return value;
  }


}
