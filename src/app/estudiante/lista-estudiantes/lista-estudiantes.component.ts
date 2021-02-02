import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/service/peticion.service';
import { Student } from 'src/app/clases/student';
import { Seccion } from 'src/app/clases/seccion';
import { Grado } from 'src/app/clases/grado';
import { RegistroEstudianteComponent } from '../registro-estudiante/registro-estudiante.component';
import { MatDialog } from '@angular/material/dialog';
import { EditarEstudianteComponent } from 'src/app/modals/editar-estudiante/editar-estudiante.component';

@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista-estudiantes.component.html',
  styleUrls: ['./lista-estudiantes.component.css']
})
export class ListaEstudiantesComponent implements OnInit {

  listaStudent = Array<Student>()
  listaSecciones: Array<Seccion>
  listaGrado: Array<Grado>
  grado:string = "1"
  seccion:string = "1"
  ultimo:number = -1
  nombreEstudiante:string
  estadoStatus:number = 0;
  //data por defecto para listar por grado y seccion
  data = {'grado':1, 'seccion':1}

  constructor(
    private peticion:PeticionService,
    public dialog: MatDialog
  ) {
    this.listastudent(this.data)
    this.Secciones();
    this.Grados();
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

  verificarParaListar(){
    if (this.grado!="" && this.seccion!="") {
      this.data = {'grado':this.grado as any, 'seccion': this.seccion as any}
      this.listastudent(this.data);
    }
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

  vistaImagenPerfil(){
    console.log("ola")
  }

  //funcion para listar los grados
  Secciones(){
    this.peticion.listaSecction().subscribe(
      (res)=>{
        this.listaSecciones = res
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  //funcion para listar secciones
  Grados(){
    this.peticion.listaGrado().subscribe(
      (res)=>{
        this.listaGrado = res
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  modalEditar(i:number) {
    const dialogRef  = this.dialog.open(EditarEstudianteComponent,{data:this.listaStudent[i]});
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        this.verificarParaListar();
      }
      if (result==true) {
        this.verificarParaListar();
      }
    });
  }

  estadoStudent(dni:string, email:string, i:number, estadocurrect:number) {

    if (estadocurrect==0) {

      this.listaStudent[i].status_student = '1'
      //data a enviar
      const data = {'dni':dni,'email':email,'estatus':1}

      this.peticion.AccessStudent(data).subscribe(
        (res)=>{
          console.log(res)
          this.peticion.mensaje('Estudiante habilitado',4500,'center','center')
        },
        (error)=>{
          console.log(error)
        }
      )

    }

    if (estadocurrect==1){

      this.listaStudent[i].status_student = '0'
      //data  enviar
      const data = {'dni':dni,'email':email,'estatus':0}

      this.peticion.AccessStudent(data).subscribe(
        (res)=>{
          console.log(res)
          this.peticion.mensaje('Estudiante desabilitado',4500,'center','center')
        },
        (error)=>{
          console.log(error)
        }
      )

    }

  }

  actualizarTabla(){
    this.verificarParaListar();
  }

}


