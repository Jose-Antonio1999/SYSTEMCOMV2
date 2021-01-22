import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/clases/student';
import { PeticionService } from 'src/app/service/peticion.service';

@Component({
  selector: 'app-lista-padres',
  templateUrl: './lista-padres.component.html',
  styleUrls: ['./lista-padres.component.css']
})
export class ListaPadresComponent implements OnInit {
  ultimo:number = -1
  dniPadre:String;
  listaStudent = Array<Student>()
  data = {'grado':null, 'seccion':null}
  constructor(
    private peticion:PeticionService
  ) {
    this.listastudent(this.data);
  }

  ngOnInit(): void {
  }

  listastudent(data:any){
    this.peticion.listaStudent(data).subscribe(
      (res)=>{
        this.listaStudent = res as any
        if (Object.keys(res).length==0) {
          this.ultimo = -1
        } else {
          this.ultimo = 1
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  Minuscula(data:string){
    return data.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
  }

}
