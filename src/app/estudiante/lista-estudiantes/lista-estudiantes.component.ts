import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/service/peticion.service';
import { Student } from 'src/app/clases/student';

@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista-estudiantes.component.html',
  styleUrls: ['./lista-estudiantes.component.css']
})
export class ListaEstudiantesComponent implements OnInit {
  listaStudent = Array<Student>()
  constructor(
    private peticion:PeticionService
  ) {
    this.listastudent()
  }

  ngOnInit(): void {
  }

  listastudent(){
    this.peticion.listaStudent().subscribe(
      (res)=>{
        this.listaStudent = res as any
        console.log(res)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  estadoUser(i:number):String{
    let status = "estado"
    if (i==1) {
      status = "Habilitado"
    }
    if (i==0) {
      status = "Desabilitado"
    }
    return status;
  }

  convetirMinuscula(data:string){
    return data.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
  }

}
