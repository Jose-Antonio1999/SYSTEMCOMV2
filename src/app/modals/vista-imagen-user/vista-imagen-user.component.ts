import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-vista-imagen-user',
  templateUrl: './vista-imagen-user.component.html',
  styleUrls: ['./vista-imagen-user.component.css']
})
export class VistaImagenUserComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
  }

  convetirMinuscula(data:string){
    return data.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
  }

}
