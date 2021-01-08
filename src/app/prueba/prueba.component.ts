import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  data:string = "hola"
  constructor() {
    console.log("alguien me ejecuto")
  }

  ngOnInit(): void {
  }

}
