import { Injectable } from '@angular/core';
/*ROLES:  
    1: Alumno
    2: Profesor
    3: Administrador
    4: Usuario
    */

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  listaRoles: any[] = [
    {
      id:1,
      nombre:"Alumno"
    },
    {
      id:2,
      nombre:"Profesor"      
    },
    {
      id:3,
      nombre:"Administrador"
    },
    {
      id:4,
      nombre:"Usuario"
    }];

  constructor() { }

  getRoles() {
    return this.listaRoles;
  }

  getRol(id: number) {
    return this.listaRoles[this.listaRoles.findIndex(x => x.id == id)];
  }
  getRolPorNombre(nombre:string)
  {
    return this.listaRoles[this.listaRoles.findIndex(x => x.nombre == nombre)];
  }

}
