import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultaDNI } from 'src/app/clases/API';
import { Grado } from 'src/app/clases/grado';
import { Parent } from 'src/app/clases/Parent';
import { Seccion } from 'src/app/clases/seccion';
import { Student } from 'src/app/clases/student';
import { userCurrent } from 'src/app/clases/user';
import { PeticionService } from 'src/app/service/peticion.service';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.css']
})
export class EditarEstudianteComponent implements OnInit {

  crearFormulario:FormGroup
  listaSecciones: Array<Seccion>
  listaGrado: Array<Grado>
  Mgrado:String
  Mseccion:String
  Mcorrecto:boolean = false
  barraCarga:boolean = false
  verCargaPhoto:boolean = false
  porcentajeSubidaFoto:number = 0
  usuarioActual:userCurrent
  apoderado:Parent
  alumnoData:ConsultaDNI
  ApoderadoData:ConsultaDNI
  imgURL:String

  constructor(
    private formBuilder:FormBuilder,
    private peticion:PeticionService,
    private storage: AngularFireStorage,
    //recibir la data de editar
    @Inject(MAT_DIALOG_DATA) public data: Student
    ) {

    this.crearFomularioRegistroAlumnado()
    this. Secciones();
    this.Grados();
    this.completarDatosFormulario();
  }

  ngOnInit(): void {
  }
  crearFomularioRegistroAlumnado(){

    this.crearFormulario = this.formBuilder.group({
      grado:['',Validators.required],
      seccion:['',Validators.required],
      dni_estudiante:[''],
      nombre_estudiante:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoP_estudiante:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoM_estudiante:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      photo:[''],
      correo_estudiante:['',[Validators.required,Validators.email]],
      dni_apoderado:['',[Validators.required,Validators.minLength(8),Validators.pattern(/^([0-9])*$/)]],
      nombre_apoderado:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoP_apoderado:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoM_apoderado:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      correo_apoderado:['',[Validators.required,Validators.email]],
      celular_apoderado:['',[Validators.required,Validators.minLength(9),Validators.pattern(/^([0-9])*$/)]],
    })
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

    let dni = this.crearFormulario.value.dni_estudiante_2
    let nombre = this.crearFormulario.value.nombre_estudiante
    let email = this.crearFormulario.value.correo_estudiante

    if (dni!="" || nombre!="" || email!="") {
        const file = event.target.files[0];
        const ruta = 'studentPhotos/'+this.crearFormulario.value.dni_estudiante_2;
        const ref = this.storage.ref(ruta);
        const task = ref.put(file);

        //verificamos mientras se sube la foto
        task.then((tarea)=>{
          ref.getDownloadURL().subscribe((imgUrl)=>{
            this.imgURL = imgUrl
            this.verCargaPhoto = true
            this.peticion.mensaje("Foto de perfil actualizado correctamente",4500,'center','center')
          })
        })
        //observale de la subida del archivo en %
        task.percentageChanges().subscribe((porcentaje)=>{
            this.barraCarga = true
            this.porcentajeSubidaFoto = parseInt(porcentaje.toString(),10)
        })
    } else {
        this.peticion.mensaje("Complete los campos anteriores para subir la foto",3500,'center','center')
        this.crearFormulario.controls['photo'].setValue('')
    }

  }

  update(){
    //pasar la url de la imagen y registrar
    this.crearFormulario.value.photo = this.imgURL
    this.peticion.updateStudent(this.crearFormulario.value).subscribe(
      (res)=>{
        //cerrar sesión ni bie se crea el usuario
        this.porcentajeSubidaFoto = 0;
        this.barraCarga = false
        this.peticion.mensaje("Datos del estudiante actualizados correctamente",3500,'center','center')
        console.log(res)
      },
      (error)=>{
        console.log(error)
      }
    )

  }

  mostrarMensaje(){
    // this.peticion.mensaje("Los cambios")
  }

  llenarDatosApoderadoBD(data:Parent){
    this.crearFormulario.controls['id_apoderado'].setValue(data.id_parent)
    this.crearFormulario.controls['nombre_apoderado'].setValue(data.name_parent)
    this.crearFormulario.controls['apellidoP_apoderado'].setValue(data.firts_name_parent)
    this.crearFormulario.controls['apellidoM_apoderado'].setValue(data.last_name_parent)
    this.crearFormulario.controls['correo_apoderado'].setValue(data.email_parent)
    this.crearFormulario.controls['celular_apoderado'].setValue(data.phone_number_parent)
  }

  verificarApoderado () {
    if (this.crearFormulario.value.dni_apoderado.length==8) {
      this.peticion.existeApoderado(this.crearFormulario.value.dni_apoderado).subscribe(
        (res)=>{
          if (res!='0'){
            this.apoderado = res[0] as Parent
            this.llenarDatosApoderadoBD(this.apoderado)
            console.log("data BD")
          } else {
            this.APIRENIECApoderado();
            console.log("data RENIEC")
          }
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }

  completarDatosFormulario() {
      this.crearFormulario.controls['grado'].setValue(this.data.id_grade)
      this.crearFormulario.controls['seccion'].setValue(this.data.id_section)
      this.crearFormulario.controls['dni_estudiante'].setValue(this.data.DNI_student)
      this.crearFormulario.controls['nombre_estudiante'].setValue(this.data.name_student)
      this.crearFormulario.controls['apellidoP_estudiante'].setValue(this.data.firts_name_student)
      this.crearFormulario.controls['apellidoM_estudiante'].setValue(this.data.last_name_student)
      this.crearFormulario.controls['correo_estudiante'].setValue(this.data.email_student)
      //this.crearFormulario.controls['id_apoderado'].setValue(this.data)
      this.crearFormulario.controls['dni_apoderado'].setValue(this.data.DNI_parent)
      this.crearFormulario.controls['nombre_apoderado'].setValue(this.data.name_parent)
      this.crearFormulario.controls['apellidoP_apoderado'].setValue(this.data.firts_name_parent),
      this.crearFormulario.controls['apellidoM_apoderado'].setValue(this.data.last_name_parent)
      this.crearFormulario.controls['correo_apoderado'].setValue(this.data.email_parent)
      this.crearFormulario.controls['celular_apoderado'].setValue(this.data.phone_number_parent)
      //desabilitar el campo original y crear uno nuevo
      this.crearFormulario.controls.dni_estudiante.disable()
      this.crearFormulario.addControl('dni_estudiante_2', new FormControl(this.data.DNI_student,[Validators.required]))
  }

  verificarAlumnoBD() {
    if (this.crearFormulario.value.dni_estudiante.length==8) {
        this.peticion.existeAlumno(this.crearFormulario.value.dni_estudiante).subscribe(
          (res)=>{
            if (res!='0') {
              this.peticion.mensaje(res,4500,'center','center')
              this.crearFormulario.controls.nombre_estudiante.disable()
              this.crearFormulario.controls.photo.disable()
              console.log(res)
            } else {
              this.APIRENIECAlumno()
              console.log(res)
              this.crearFormulario.controls.nombre_estudiante.enable()
              this.crearFormulario.controls.photo.enable()
            }
          },
          (error)=>{
            console.log(error)
          }
        )
    }
  }

  //conulsta de datos a la RENIEC
  APIRENIECAlumno() {
    if (this.crearFormulario.value.dni_estudiante.length==8) {
      this.peticion.APIdni(this.crearFormulario.value.dni_estudiante).subscribe(
        (res)=>{
          this.alumnoData = res
          this.crearFormulario.controls['nombre_estudiante'].setValue(this.alumnoData.name)
          this.crearFormulario.controls['apellidoP_estudiante'].setValue(this.alumnoData.first_name)
          this.crearFormulario.controls['apellidoM_estudiante'].setValue(this.alumnoData.last_name)
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }

  //conulsta de datos a la RENIEC
  APIRENIECApoderado() {
    if (this.crearFormulario.value.dni_apoderado.length==8) {
      this.peticion.APIdni(this.crearFormulario.value.dni_apoderado).subscribe(
        (res)=>{
          this.ApoderadoData = res
          this.crearFormulario.controls['nombre_apoderado'].setValue(this.ApoderadoData.name)
          this.crearFormulario.controls['apellidoP_apoderado'].setValue(this.ApoderadoData.first_name)
          this.crearFormulario.controls['apellidoM_apoderado'].setValue(this.ApoderadoData.last_name)
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }

}
