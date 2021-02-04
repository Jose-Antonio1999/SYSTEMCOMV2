import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Staff } from 'src/app/clases/staff';
import { PeticionService } from 'src/app/service/peticion.service';

@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.css'],
  animations: [
    trigger('toltip',
    [
      state('stateOne', style({
        backgroundColor:"#1B386E",
        display:"none"
      })),

      state('stateTwo', style({
        backgroundColor:"red",
        display:"block"
      })),

      transition('stateOne <=> stateTwo',
        animate('0.5s')
      )

    ])
  ]
})
export class ListaPersonalComponent implements OnInit {

  listaPersonal = Array<Staff>();
  estadoToltip:string = "stateOne"
  asignar:string = "no"
  nombrePersonal:string
  numeroPersonal:number = 0
  constructor(
    private peticion: PeticionService
  ) {
    this.listaStaff();
  }

  ngOnInit(): void {
  }

  listaStaff() {
    this.peticion.listaStaff().subscribe(
      (res)=>{
        this.listaPersonal = res as any
        this.numeroPersonal = this.listaPersonal.length
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  convetirMinuscula(data:string){
    return data.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
  }

}
