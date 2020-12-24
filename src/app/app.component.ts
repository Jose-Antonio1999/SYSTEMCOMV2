import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SISTEMA-COMUNICADOS-V2';
  estadoVista:boolean
  constructor() {
    console.log("Soy primero")
    this.verificarSesion();
  }
  verificarSesion() {
    let data = localStorage.removeItem('current')
    if (data==null){
      this.estadoVista = false
    } else {
      this.estadoVista = true
    }
  }
}
