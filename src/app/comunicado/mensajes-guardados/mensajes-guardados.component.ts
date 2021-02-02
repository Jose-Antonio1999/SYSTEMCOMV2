import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Comunicado } from 'src/app/clases/comunicado';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-mensajes-guardados',
  templateUrl: './mensajes-guardados.component.html',
  styleUrls: ['./mensajes-guardados.component.css']
})
export class MensajesGuardadosComponent implements OnInit {

  @ViewChild('cuerpoMensaje',{static:false}) cuerpoMensaje:ElementRef

  mVacio:boolean = false
  //Datos a mostrar mensaje
  tipo:String
  fecha:String
  asunto:String
  contenido:String
  valorBusqueda:String = ''
  mensajeVisible:boolean = true
  data:String
  id_personal:any
  asuntoBusqueda:String
  usuarioActivo:Usuario;
  usuarioCurrent:userCurrent
  vista:boolean = false
  listaComunicados:Array<Comunicado>
  vistaMensaje:boolean = false

  constructor(
    private ruta:Router,
    private peticion:PeticionService,
    private storage:StorageService
  ) {
    this.sesionInciada();
  }

  ngOnInit(): void {
  }

  recortarMensaje(mensaje:String):String{
    if(mensaje.length<=150){
      return mensaje;
    }else{
      return mensaje.substr(0,150);
    }
  }

  asuntoComunicado:string
  verMensaje(i:number){
    this.asuntoComunicado = this.listaComunicados[i].affair
    this.cuerpoMensaje.nativeElement.innerHTML = this.listaComunicados[i].body
  }

  sesionInciada(){

    if (localStorage.getItem("current")==null || localStorage.getItem("current")=="") {
        this.ruta.navigateByUrl('login');
    } else {
      this.usuarioActivo = JSON.parse(this.storage.decrypt(localStorage.getItem("current")))
      if (this.usuarioActivo==null || this.usuarioActivo==null) {
          this.ruta.navigateByUrl('login');
      } else {
        this.peticion.obtenerPerfilCurrent(this.usuarioActivo.DNI).subscribe(
          (res)=>{
            if (res==null || res=="") {
              this.vista = false
              this.ruta.navigateByUrl('login');
            } else {
              this.usuarioCurrent = res[0]
              this.listaComunicadoEnviado(this.usuarioCurrent.id_staff)
            }
          },
          (error)=>{
            console.log(error)
          }
        )
      }
    }
  }

  listaComunicadoEnviado(id:any){
    this.peticion.listaComunicadoGuardado(id).subscribe(
      (res)=>{
        this.listaComunicados = res
        if (this.listaComunicados.length==0){
          this.vistaMensaje = true
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  eliminarComunicados(id_comunicado:any,i:number){
    this.peticion.eliminarComunicado(id_comunicado).subscribe(
      (res)=>{
        console.log(res)
        this.listaComunicados.splice(i,1);
        if(this.listaComunicados.length==0){
          this.vistaMensaje = true
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  editarComunicado(i:number){
    localStorage.setItem("edit-comunicado",JSON.stringify(this.listaComunicados[i]));
    if (this.usuarioActivo.profile==10)
        this.ruta.navigateByUrl('Admin/comunicado')
    if (this.usuarioActivo.profile==30)
        this.ruta.navigateByUrl('Docente/redactar-comunicado')
  }

}
