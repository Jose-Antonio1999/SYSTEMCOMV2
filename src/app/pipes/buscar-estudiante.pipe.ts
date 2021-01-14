import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarEstudiante'
})
export class BuscarEstudiantePipe implements PipeTransform {

  transform(lista: any[], texto:string): any[] {
    if (!texto) return lista;
    return lista.filter(estudiante => estudiante.name_student.toUpperCase().includes(texto.toUpperCase()))
  }

}
