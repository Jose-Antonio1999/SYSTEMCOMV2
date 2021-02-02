import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comunicado } from 'src/app/clases/comunicado';
import { Grado } from 'src/app/clases/grado';
import { Seccion } from 'src/app/clases/seccion';
import { Usuario } from 'src/app/clases/usuario';
import { PeticionService } from 'src/app/service/peticion.service';
import { StorageService } from 'src/app/service/storage.service';
//interface para guardar el password
interface savePass {
  passw:String
  recordar:boolean,
  email:String
}

@Component({
  selector: 'app-comunicado-docente',
  templateUrl: './comunicado-docente.component.html',
  styleUrls: ['./comunicado-docente.component.css']
})
export class ComunicadoDocenteComponent implements OnInit {

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
  archivoAdjuntadoURL:String = ""
  //text HTML
  text1:String
  //variables para un Ngmodel
  tipoCumunicado:string
  cuerpoComunicado:String
  userEmail:String
  dataUser:Usuario
  //variable
  passwo:String
  saveP :savePass
  campoPass:boolean = true
  //variable de espera en el envio de mensaje
  vistaSpinner:boolean = false

  //avriable de envio docente
  grado:String
  seccion:String
  tipogrado:String

  constructor(
    private formbuilder:FormBuilder,
    private ruta:Router,
    private servicestorage:StorageService,
    private peticion:PeticionService,
    private storage: AngularFireStorage,
    ) {
    this.sesionInciada();
    this.crearFomulario();
    this.Grados();
    this.Secciones();
    this.agregarListaDestinos();
    //obtener data del docente tutor
    this.recibirDataDocente()

  }

  ngOnInit(): void {
    this.completeEdit();
    //modal
    this.formularioHelp = this.formbuilder.group({
      passwo:['']
    })
    this.verEstadoModal()
  }

  recibirDataDocente(){
    if (localStorage.getItem('comunicado')!=null) {
      const data = this.servicestorage.decrypt(localStorage.getItem('comunicado'))
      if(data.opcion==0){
        this.enviaIndividual = true
        this.formulalrioComunicado.controls['emaildestino'].setValue(''+data.data)
      }
      this.formulalrioComunicado.controls['destinoGrupal'].setValue(''+data.opcion)
      this.formulalrioComunicado.controls['grado'].setValue(data.grado)
      this.formulalrioComunicado.controls['seccion'].setValue(this.peticion.idSeccion(data.secion))
      this.formulalrioComunicado.controls['origen'].setValue(data.emailDocente)
      this.grado = data.grado
      this.seccion = data.secion
      this.tipogrado = this.peticion.gradoSegunName(this.grado )
      localStorage.removeItem('comunicado')
    }
  }

  crearFomulario(){
    //crea el formulario de envio
    this.formulalrioComunicado = this.formbuilder.group({
      origen:['',[Validators.required,Validators.email]],
      destinoGrupal:['',[Validators.required]],
      archivoAdjunto:[''],
      grado:[''],
      seccion:[''],
      emaildestino:[''],
      asunto:['',Validators.required],
      tipo:['',Validators.required],
      cuerpo:['',Validators.required],
      pass:['',Validators.required],
      rutaArchivo:['']
    })
  }

  sesionInciada(){
    if (localStorage.getItem("current")==null || localStorage.getItem("current")=="") {
      this.ruta.navigateByUrl('login');
    } else {
      this.dataUser = JSON.parse(this.servicestorage.decrypt(localStorage.getItem("current")))
      this.peticion.obtenerTutor(this.dataUser.DNI).subscribe(
        (res)=>{
          // pasar el grado y seccion para la data alumno
          if (res==null || res=="") {
            this.ruta.navigateByUrl('login');
          } else {
            this.usercurrent = res[0];
            //eliminar localstorage recorpass
            //this.eliminarRecordarpass()
          }
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }

  comunicadoEditar:Comunicado
  completeEdit(){
    if(localStorage.getItem('edit-comunicado')!=null){
      this.comunicadoEditar = JSON.parse(localStorage.getItem('edit-comunicado'));
      this.formulalrioComunicado.controls['cuerpo'].setValue(this.comunicadoEditar.body)
      this.formulalrioComunicado.controls['asunto'].setValue(this.comunicadoEditar.affair);
      //depues de rellenar eliminar la data temporal
      localStorage.removeItem('edit-comunicado')
    }
  }

  eliminarRecordarpass(){
    if(localStorage.getItem('recordarPass')!=null){
      const recupe = JSON.parse(this.servicestorage.decrypt(localStorage.getItem("recordarPass")))
      if (recupe.email!=this.usercurrent.user) {
          localStorage.removeItem('recordarPass')
          this.campoPass = true
      }
    }
  }

  agregarListaDestinos() {
    this.listaDestinos = ['Para una persona determinada','Apoderados de este aula','Todos los alumnos del aula']
  }

  opcion(i:Number){
      if (i==0) {
        this.enviaIndividual = true
      }else{
        this.enviaIndividual  = false
        this.formulalrioComunicado.controls['emaildestino'].setValue('')
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
            this.archivoAdjuntadoURL = imgUrl
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
        this.formulalrioComunicado.controls['archivoAdjunto'].setValue('')
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
    this.formulalrioComunicado.reset();
    this.archivoAdjuntadoURL = "";
    this.barraCarga = false;
    this.enviaIndividual  = false;
    this.enviaGradoSeccion = false;
    this.formulalrioComunicado.controls['origen'].setValue(this.userEmail);
    this.verEstadoModal();
    this.tamanioTexto = 0;
  }

  CamposIndividualesvacios():boolean{
    let verificar:boolean = false

    if(this.enviaIndividual==true) {
      if (this.formulalrioComunicado.value.emaildestino=="" ||  this.formulalrioComunicado.value.emaildestino==null){
        this.peticion.mensaje("Complete el campo email",3500,'center','center');
        verificar = true
      } else if (this.enviaIndividual==true && this.esValidoEmail(this.formulalrioComunicado.value.emaildestino)==false) {
        this.peticion.mensaje("Digite un email válido",3500,'center','center');
        verificar = true
      }
    }

    if(this.enviaGradoSeccion==true) {
      if (this.formulalrioComunicado.value.grado==null ||
          this.formulalrioComunicado.value.seccion==null ||
          this.formulalrioComunicado.value.grado=="" ||
          this.formulalrioComunicado.value.seccion=="") {
            this.peticion.mensaje("Complete el campo grado y sección",3500,'center','center');
            verificar = true
      }
    }
    if(this.formulalrioComunicado.value.pass=="" || this.formulalrioComunicado.value.pass==null) {
      this.peticion.mensaje("Complete el campo password",3500,'center','center');
      verificar = true
    }
    return verificar;
  }

  enviar(){

    if (this.CamposIndividualesvacios()==false) {
      //asignar a la variable espinner para ver como carga
      this.vistaSpinner = true
      //enviar comunicado
      this.formulalrioComunicado.value.rutaArchivo = this.archivoAdjuntadoURL
      this.peticion.enviarComunicadoDocente(this.formulalrioComunicado.value).subscribe(
        (res)=>{
          //verificar el envio
          if (res==1) {
            this.peticion.mensaje("Mensaje enviado correctamente",4500,'center','center')
            this.vistaSpinner = false
            this.cancelarEnvio()
          } else {
            this.vistaSpinner = false
            this.peticion.mensaje("Error al enviar mensaje, verifique su password o los emails a enviar",4500,'center','center')
          }
          console.log(res)
        },
        (error)=>{
          this.vistaSpinner = false
          this.peticion.mensaje("Error al enviar mensaje, verifique su password o los emails a enviar",4500,'center','center')
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
      const recupe = JSON.parse(this.servicestorage.decrypt(localStorage.getItem("recordarPass")))
      if (recupe.email == this.userEmail) {
        if (recupe.recordar == false) {
          //esperar un segundo para ejecutar el code
          setTimeout(() => {
            this.passw.nativeElement.dataset.bsToggle = ""
          },2000);

        } else {
          //esperar un segundo para ejecutar el code
          this.formulalrioComunicado.controls['pass'].setValue(recupe.passw)
          //esconder campo password
          this.campoPass = false
        }
      } else {
        localStorage.removeItem('recordarPass')
      }
    }
  }

  savePassw() {
    //crear un objeto de datos
    const savep = { passw:this.formularioHelp.value.passwo, recordar:true, email:this.userEmail}
    //guardar en storage la data encryptada
    localStorage.setItem("recordarPass",this.servicestorage.encrypt(JSON.stringify(savep)))
    //inicializar valor en el control
    this.formulalrioComunicado.controls['pass'].setValue(this.formularioHelp.value.passwo)
    //quitar la clase modal al input
    this.passw.nativeElement.dataset.bsToggle = ""
    //esconder campo
    this.campoPass = false
  }

  noMostrarMensaje(){
    //quitar la propiedad modad
    this.passw.nativeElement.dataset.bsToggle = ""
    //crear un obejto array
    const savep = { passw:"none", recordar:false, email:this.userEmail}
    localStorage.setItem("recordarPass",this.servicestorage.encrypt(JSON.stringify(savep)))
  }

  guardarComunicado(){
    //enviar comunicado
    this.formulalrioComunicado.value.rutaArchivo = this.archivoAdjuntadoURL
    this.peticion.guardarMensaje(this.formulalrioComunicado.value).subscribe(
      (res)=>{
        this.peticion.mensaje(res,4500,'center','center')
        this.cancelarEnvio()
      },
      (error)=>{
        // this.vistaSpinner = false
        // this.peticion.mensaje("Error al enviar mensaje, verifique su password o los emails a enviar",4500,'center','center')
        console.log(error)
      }
    )
  }

  esValidoEmail(mail:any) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
  }

}
