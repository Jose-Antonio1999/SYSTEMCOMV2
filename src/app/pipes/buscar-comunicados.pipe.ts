import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarComunicados'
})
export class BuscarComunicadosPipe implements PipeTransform {

  transform(lista: any[], texto: string): any[] {
    if (!texto) return lista;
    return lista.filter(comunicado => comunicado.affair.toUpperCase().includes(texto.toUpperCase()))
  }

}
