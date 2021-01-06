import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bandeja-salida',
  templateUrl: './bandeja-salida.component.html',
  styleUrls: ['./bandeja-salida.component.css']
})
export class BandejaSalidaComponent implements OnInit {

  listaMensajes = new Array<any>();
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

  constructor() {
    this.listaMensajes.push("1")
    this.listaMensajes.push("1")
    this.listaMensajes.push("1")
    this.listaMensajes.push("1")
    this.listaMensajes.push("1")
    this.listaMensajes.push("1")
    this.listaMensajes.push("1")
    this.listaMensajes.push("1")
    this.listaMensajes.push("1")
    this.listaMensajes.push("1")
    this.listaMensajes.push("1")
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

  verMensaje(i:number){
    this.tipo = this.listaMensajes[i].tipo_comunicado
    this.asunto = this.listaMensajes[i].asunto
    this.contenido = this.listaMensajes[i].contenido
    this.fecha = this.listaMensajes[i].fecha
    this.fecha = this.recortarFecha()

  }
  recortarFecha():String{
    // let dia
    // let mes
    // let anio
    // //recortar la fecha
    // anio = this.fecha.substr(0,4)
    // mes = this.fecha.substr(5,2)
    // dia = this.fecha.substr(8,10)
    // return this.inject.fechaHora(dia,mes,anio)
    return "Hola";
  }

  eliminarMensaje(i:number){

  }

  buscarMensajeDos(){
    // if(this.valorBusqueda.length==1){
    //   this.injectM.ListaComunicados().subscribe((res)=>{
    //     this.listaMensajes = res
    //     this.mVacio = false
    //   })
    // }else{
    //   this.injectM.buscarComunicado(this.valorBusqueda as any).subscribe((res)=>{
    //     this.listaMensajes = res
    //     if(res.length == 0){
    //       this.mVacio = true
    //     }else{
    //       this.mVacio = res
    //       this.mVacio = false
    //     }
    //   })
    // }
  }

}
