import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {

  transform(value: Date): string {
    if (value!=null)
    {
      return this.CalcularEdad(value).toString();
    }
    else
    {
      return "";
    }
  }

  CalcularEdad(fechaNac:Date): number {
    let hoy:Date= new Date();

    const fn: Date = new Date(fechaNac);
    let edad: number = hoy.getFullYear() - fn.getFullYear();
    const m: number = hoy.getMonth() - fn.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fn.getDate())) {
      edad--;
    }
    return edad;
}

}
