import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-menu-student',
  templateUrl: './menu-student.component.html',
  styleUrls: ['./menu-student.component.css'],
  animations: [
    trigger('animarMenu',
    [
      state('stateOne', style({
        backgroundColor:"#154360"
      })),

      state('stateTwo', style({
        backgroundColor:"#154360 ",
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
        color:'#2E2438'
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
export class MenuStudentComponent implements OnInit {
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
    public dialog: MatDialog,
    private storage:StorageService) {

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
            //si se accedio eliminar la data guardada
            localStorage.removeItem('current')
            this.peticion.mensaje('Acceso denegado',4500,'center','center')
            //mas aun redirigir a login
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
    let name = data;
    if (data.search(" ")>1) {
      name = data.substr(0,data.search(" "));
    }
    return name;
  }

  convetirMinuscula(data:string){
    return data.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
  }

  openModalData(){
    /*
    const dialogRef  = this.dialog.open(AjustesDocenteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        console.log("cerro")
      }
    });*/
  }

  verificarActivo() {
    this.peticion.verificarActivo(this.usercurrent.email_staff).subscribe(
      (res)=>{
        if (res=='0') {
          this.SignOut();
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }

}
