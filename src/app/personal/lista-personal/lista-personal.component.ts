import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.css']
})
export class ListaPersonalComponent implements OnInit {
  listaPersonal = Array<any>();
  constructor() {
    this.listaPersonal.push(1);
    this.listaPersonal.push(1);
    this.listaPersonal.push(1);
    this.listaPersonal.push(1);
    this.listaPersonal.push(1);
    this.listaPersonal.push(1);
    this.listaPersonal.push(1);
  }

  ngOnInit(): void {
  }

}
