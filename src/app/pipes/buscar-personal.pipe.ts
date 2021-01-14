import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarPersonal'
})
export class BuscarPersonalPipe implements PipeTransform {

  transform(lista: any[], texto: string): any[] {
    if (!texto) return lista;
    return lista.filter(personal => personal.name_staff.toUpperCase().includes(texto.toUpperCase()))
  }
}
