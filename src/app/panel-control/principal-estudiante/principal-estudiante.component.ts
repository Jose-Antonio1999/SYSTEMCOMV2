import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal-estudiante',
  templateUrl: './principal-estudiante.component.html',
  styleUrls: ['./principal-estudiante.component.css']
})
export class PrincipalEstudianteComponent implements OnInit {

  constructor() {
    console.log("principal estudiante")
  }

  ngOnInit(): void {
  }

}
