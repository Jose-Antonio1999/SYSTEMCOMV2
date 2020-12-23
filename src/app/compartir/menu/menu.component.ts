import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('animarMenu',
    [
      state('stateOne', style({
        backgroundColor:"#03273d"
      })),

      state('stateTwo', style({
        backgroundColor:"#03273d",
        width:"185px"
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
export class MenuComponent implements OnInit {
  estadoMenu:String = "stateOne"
  stateIcon:string = "hiddenIcon"
  animateLetter:string  = "stateNormal"

  constructor(private auth: AngularFireAuth, private ruta:Router, private spinner:NgxSpinnerService) { }

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

  iniciarsesion(){
    console.log(JSON.parse(localStorage.getItem("current")))
  }

  SignOut(){
    localStorage.removeItem('current')
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide()
      this.ruta.navigateByUrl('login');
    }, 1000);
  }

}
