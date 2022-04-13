import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../clases/usuario';

@Pipe({
  name: 'apellidonombre'
})
export class ApellidonombrePipe implements PipeTransform {

  transform(value: Usuario, ): string {
    let apeNombre:string="";
    if (value!=null)
    {
      if ((value.apellido!=null)&&(value.nombre!=null))
      {
        apeNombre=value.apellido+", "+value.nombre;
      }
      
    }
    
    return apeNombre;
  }

}
