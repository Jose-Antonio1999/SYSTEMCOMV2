import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grado } from 'src/app/clases/grado';
import { Seccion } from 'src/app/clases/seccion';
import { PeticionService } from 'src/app/service/peticion.service';

@Component({
  selector: 'app-panel-comunicado',
  templateUrl: './panel-comunicado.component.html',
  styleUrls: ['./panel-comunicado.component.css']
})
export class PanelComunicadoComponent implements OnInit {

  @ViewChild("vistaPrevia") vistaPrevia:ElementRef

  formulalrioComunicado:FormGroup
  //variable para mostrar campos para el envio
  enviaGradoSeccion:boolean = false;
  enviaIndividual:boolean = false;
  //array de grados y secciones
  listaSecciones: Array<Seccion>
  listaGrado: Array<Grado>
  verCargaPhoto:boolean = false
  porcentajeSubidaFoto:number = 0
  barraCarga:boolean = false
  imgURL:String
  //text HTML
  text1:String
  //variables para un Ngmodel
  tipoCumunicado:string
  cuerpoComunicado:String

  constructor(
    private formbuilder:FormBuilder,
    private peticion:PeticionService,
    private storage: AngularFireStorage) {

    this.crearFomulario();
    this.Grados();
    this.Secciones();
  }

  ngOnInit(): void {

  }

  crearFomulario(){
    this.formulalrioComunicado = this.formbuilder.group({
      destinoGrupal:['',[Validators.required]],
      grado:[''],
      seccion:[''],
      emaildestino:['',[Validators.email]],
      tipo:['',Validators.required],
      asunto:['',Validators.required],
      cuerpo:['',Validators.required],
      pass:['',Validators.required],
      archivo:['']
    })
  }

  opcion(){
    let destinogrupal = this.formulalrioComunicado.value.destinoGrupal
    if (destinogrupal==4) {
      this.enviaIndividual = true
      this.enviaGradoSeccion = false
    }else if (destinogrupal==5) {
      this.enviaGradoSeccion = true
      this.enviaIndividual  = false
    } else {
      this.enviaIndividual  = false
      this.enviaGradoSeccion = false
    }
  }

    //funcion para listar los grados
    Secciones(){
      this.peticion.listaSecction().subscribe(
        (res)=>{
          this.listaSecciones = res
        },
        (error)=>{
          console.log(error)
        }
      )
    }
    //funcion para listar secciones
    Grados(){
      this.peticion.listaGrado().subscribe(
        (res)=>{
          this.listaGrado = res
        },
        (error)=>{
          console.log(error)
        }
      )
    }

    onFile(event) {
      const file = event.target.files[0];
      const ruta = 'staffPhotos/'+this.formulalrioComunicado.value.dni;
      const ref = this.storage.ref(ruta);
      const task = ref.put(file);

       //verificamos mientras se sube la foto
      task.then((tarea)=>{
        ref.getDownloadURL().subscribe((imgUrl)=>{
          this.imgURL = imgUrl
          this.verCargaPhoto = true
        })
      })
      //observale de la subida del archivo en %
      task.percentageChanges().subscribe((porcentaje)=>{
        this.barraCarga = true
        this.porcentajeSubidaFoto = parseInt(porcentaje.toString(),10)
      })

    }

    insertarHTML(){
      this.vistaPrevia.nativeElement.innerHTML = this.formulalrioComunicado.value.cuerpo
    }

    verificarLog(){
      if (this.formulalrioComunicado.value.cuerpo.length>1500) {
        this.peticion.mensaje("Cantidad de carácteres exedidos, es posible que nose envié el texto completo",3000,'center','center')
      }
    }
    cancelarEnvio() {
      this.formulalrioComunicado.reset()
    }


}
