import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grado } from 'src/app/clases/grado';
import { Seccion } from 'src/app/clases/seccion';
import { userCurrent } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';

//interface para guardar el password
interface savePass {
  passw:String
  recordar:boolean
}

@Component({
  selector: 'app-panel-comunicado',
  templateUrl: './panel-comunicado.component.html',
  styleUrls: ['./panel-comunicado.component.css']
})
export class PanelComunicadoComponent implements OnInit {

  @ViewChild("vistaPrevia") vistaPrevia:ElementRef
  @ViewChild('passw',{static:false}) passw:ElementRef
  @ViewChild('recorpassw',{static:false}) recorpassw:ElementRef

  formulalrioComunicado:FormGroup
  formularioHelp:FormGroup
  //variable para mostrar campos para el envio
  enviaGradoSeccion:boolean = false;
  enviaIndividual:boolean = false;
  //array de grados y secciones
  listaSecciones: Array<Seccion>
  listaGrado: Array<Grado>
  listaDestinos : String[]
  verCargaPhoto:boolean = false
  porcentajeSubidaFoto:number = 0
  barraCarga:boolean = false
  verPass:boolean = false
  tamanioTexto:number = 0
  usercurrent:Usuario
  fileURL:String
  //text HTML
  text1:String
  //variables para un Ngmodel
  tipoCumunicado:string
  cuerpoComunicado:String
  userEmail:String
  //variable
  passwo:String
  saveP :savePass
  campoPass:boolean = true
  //variable de espera en el envio de mensaje
  vistaSpinner:boolean = false

  constructor(
    private formbuilder:FormBuilder,
    private peticion:PeticionService,
    private storage: AngularFireStorage) {

    this.crearFomulario();
    this.Grados();
    this.Secciones();
    this.agregarListaDestinos();
    this.usuarioCurrent();
  }

  ngOnInit(): void {
    //modal
    this.formularioHelp = this.formbuilder.group({
      passwo:['']
    })
    this.verEstadoModal()
  }

  crearFomulario(){
    //obtener el usuario de la persona actual
    let emailUser:Usuario
    emailUser = JSON.parse(localStorage.getItem('current'))
    //crea el formulario de envio
    this.formulalrioComunicado = this.formbuilder.group({
      origen:[emailUser.user,[Validators.required,Validators.email]],
      destinoGrupal:['',[Validators.required]],
      grado:[''],
      seccion:[''],
      emaildestino:[''],
      asunto:['',Validators.required],
      tipo:['',Validators.required],
      cuerpo:['',Validators.required],
      pass:[''],
      archivo:['']
    })
  }

  usuarioCurrent() {
    this.usercurrent = JSON.parse(localStorage.getItem('current'))
    this.userEmail = this.usercurrent.user
  }

  agregarListaDestinos() {
    this.listaDestinos = ['Padres en general','Docentes en general','Docentes tutores','Para una persona','Grado y secction']
  }

  opcion(i:Number){
      if (i==3) {
        this.enviaIndividual = true
        this.enviaGradoSeccion = false
      }else if (i==4) {
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
      this.porcentajeSubidaFoto = 0
      let asunt = this.formulalrioComunicado.value.asunto
      let tip = this.formulalrioComunicado.value.tipo

      if (asunt != "" || tip !="") {
        //el nombre del archivo se guardará con nombre de hora y fecha
        const fecha = new Date();
        const timestamp = fecha .getTime();
        //proceso de guardado
        const file = event.target.files[0];
        const ruta = 'communiques/'+timestamp;
        const ref = this.storage.ref(ruta);
        const task = ref.put(file);

        //verificamos mientras se sube la foto
        this.verCargaPhoto = true
        task.then((tarea)=>{
          ref.getDownloadURL().subscribe((imgUrl)=>{
            this.fileURL = imgUrl
            this.verCargaPhoto = false
          })
        },(error)=>{ this.peticion.mensaje(error,3500,'center','center')}
        )
        //observale de la subida del archivo en %
        task.percentageChanges().subscribe((porcentaje)=>{
          this.barraCarga = true
          this.porcentajeSubidaFoto = parseInt(porcentaje.toString(),10)
        },
        (error)=>{ this.peticion.mensaje(error,3500,'center','center')}
        )

      } else {
        this.peticion.mensaje("Complete los campos anteriores para adjuntar el archivo",3000,'center','center')
        this.formulalrioComunicado.controls['archivo'].setValue('')
      }
  }

  insertarHTML(){
    this.vistaPrevia.nativeElement.innerHTML = this.formulalrioComunicado.value.cuerpo
  }

  verificarLog(){
    this.tamanioTexto = this.formulalrioComunicado.value.cuerpo.length
    if (this.tamanioTexto>1800) {
      this.peticion.mensaje("Cantidad de carácteres exedidos, es posible que no se envié el texto completo",3500,'center','center')
    }
  }
  cancelarEnvio() {
    this.formulalrioComunicado.reset()
    this.barraCarga = false
    this.enviaIndividual  = false
    this.enviaGradoSeccion = false
    this.formulalrioComunicado.controls['origen'].setValue(this.userEmail)
    this.tamanioTexto = 0
  }

  enviar(){

    if (this.CamposIndividualesvacios()==false) {
      //recuperar pass si se guardo
      const recupe = JSON.parse(localStorage.getItem("recordarPass"))
      if(recupe.passw!=null){
        this.formulalrioComunicado.value.pass = recupe.passw
      }
      //asignar a la variable espinner para ver como carga
      this.vistaSpinner = true
      //enviar comunicado
      this.peticion.enviarComunicado(this.formulalrioComunicado.value).subscribe(
        (res)=>{
          this.cancelarEnvio()
          this.fileURL=""
          this.peticion.mensaje(res,4000,'center','center')
          this.vistaSpinner = false
          console.log(res)
        },
        (error)=>{
          this.vistaSpinner = false
          this.peticion.mensaje(error,4000,'center','center')
          console.log(error)
        }
      )
    }

  }

  verPassw(){
    this.passw.nativeElement.type = "text"
    this.recorpassw.nativeElement.type = "text"
    this.verPass = true
  }
  noPassw(){
    this.passw.nativeElement.type = "password"
    this.recorpassw.nativeElement.type = "password"
    this.verPass = false
  }

  verEstadoModal() {
    if (localStorage.getItem("recordarPass")!=null) {
      const recupe = JSON.parse(localStorage.getItem("recordarPass"))
      if (recupe.recordar == false) {
        this.campoPass = true
        //esperar un segundo para ejecutar el code
        setTimeout(() => {
          this.passw.nativeElement.dataset.bsToggle = ""
        },2000);

      } else {
        this.campoPass = false
      }

    }
  }

  savePassw() {
    const savep = { passw:this.formularioHelp.value.passwo, recordar:true }
    localStorage.setItem("recordarPass",JSON.stringify(savep))
    this.campoPass = false
  }

  noMostrarMensaje(){
    //quitar la propiedad modad
    this.passw.nativeElement.dataset.bsToggle = ""
    const savep = { passw:null, recordar:false }
    localStorage.setItem("recordarPass",JSON.stringify(savep))
  }

  bo(){
    localStorage.removeItem("recordarPass")
  }

  CamposIndividualesvacios():boolean{
    let verificar:boolean = false
    if(this.enviaIndividual==true && this.formulalrioComunicado.value.emaildestino=="") {
      this.peticion.mensaje("Complete el campo email",3500,'center','center');
      verificar = true
    }
    if(this.enviaGradoSeccion==true && this.formulalrioComunicado.value.grado=="" && this.formulalrioComunicado.value.seccion=="") {
      this.peticion.mensaje("Complete el campo grado y sección",3500,'center','center');
      verificar = true
    }
    return verificar;
  }

}
