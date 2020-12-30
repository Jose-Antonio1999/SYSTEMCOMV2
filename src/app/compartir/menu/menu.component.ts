import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';

import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/internal/operators';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('animarMenu',
    [
      state('stateOne', style({
        backgroundColor:"#1B386E"
      })),

      state('stateTwo', style({
        backgroundColor:"#2954A2",
        width:"170px",
        borderRight:"1px solid #FFF"
      })),

      transition('stateOne <=> stateTwo',
        animate('0.5s')
      )

    ]),

    trigger('iconLetter',
    [
      state('hiddenIcon', style({
        display:'none',
        width:'0px'
      })),

      state('displayIcon', style({
        transition:'1.5s'
      })),

      transition('hiddenIcon <=> displayIcon',
        animate('0.5s')
      )

    ]),

    trigger('animateLetter',
    [
      state('stateNormal', style({
        marginTop:'20px',
        transition:'1s',
        color:'#1B386E'
      })),

      state('stateColor', style({
        marginTop:'20px',
        transition:'1s',
        color:'#FFF'
      })),

      transition('stateLetter <=> stateColor',
      animate('0.5s')
      )

    ])

  ]
})
export class MenuComponent implements OnInit {
  estadoMenu:String = "stateOne"
  stateIcon:string = "hiddenIcon"
  animateLetter:string  = "stateNormal"
  dataUser:Usuario
  usercurrent:userCurrent
  verMenu:boolean = false
  constructor(
    private auth: AngularFireAuth,
    private ruta:Router,
    private spinner:NgxSpinnerService,
    private peticion:PeticionService,
    private storage:StorageService) {
    //mostrar datos del usuario actual
    this.sesionInciada();
  }

  ngOnInit(): void {
  }

  animarMenu(){
    this.estadoMenu = "stateTwo"
    this.stateIcon = "displayIcon"
    this.animateLetter = "stateColor"
  }

  desanimarMenu(){
    this.estadoMenu = "stateOne"
    this.stateIcon = "hiddenIcon"
    this.animateLetter = "stateNormal"
  }

  currentUSer(){
    this.auth.currentUser.then((res)=>{
      console.log(res)
    })
  }

  sesionInciada(){
    if (localStorage.getItem("current")==null || localStorage.getItem("current")=="") {
      this.ruta.navigateByUrl('login');
    } else {
      this.dataUser = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))
      this.peticion.obtenerPerfilCurrent(this.dataUser.user).subscribe(
        (res)=>{
          this.verMenu = true
          this.usercurrent = res[0];
          if (res==null || res=="") {
            this.ruta.navigateByUrl('login');
          }
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }

  SignOut(){
    localStorage.removeItem('current')
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide()
      this.ruta.navigateByUrl('login');
    }, 1000);
  }

  recortarNombre(data:string):string{
    return data.substr(0,data.search(" "));
  }

}
