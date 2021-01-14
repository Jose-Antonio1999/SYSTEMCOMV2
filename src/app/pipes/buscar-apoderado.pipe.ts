import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarApoderado'
})
export class BuscarApoderadoPipe implements PipeTransform {

  transform(lista: any[], texto: string): any[] {
    if (!texto) return lista;
    return lista.filter(apoderado => apoderado.DNI_parent.includes(texto))
  }

}
