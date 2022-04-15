import { Injectable } from '@angular/core';
import { Inscripcion } from '../clases/inscripcion';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  listaINS:Inscripcion[]=[];

  getInscripciones() {
    return this.listaINS;
  }
  addInscripcion(ins: Inscripcion) {
    ins.id = this.obtenerSiguienteId() + 1;
    this.listaINS.push(ins);
  }
  obtenerSiguienteId(): number {
    let max = 0;
    for (let i = 0; i < this.listaINS.length; i++) {
      if (this.listaINS[i].id > max)
        max = this.listaINS[i].id;
    }
    return max;
  }


  constructor() {
    this.listaINS=[
      new Inscripcion(1,1,1,new Date()),
      new Inscripcion(2,2,2,new Date()),
      new Inscripcion(3,3,3,new Date()),
      new Inscripcion(4,4,4,new Date())
    ];
   }

    getInscripcion(id: number) {
      return this.listaINS[this.listaINS.findIndex(x => x.id == id)];
    }
    updateInscripcion(ins: Inscripcion) {
      this.listaINS[this.listaINS.findIndex(x => x.id == ins.id)] = ins;
    }
    deleteInscripcion(ins: Inscripcion) {
      this.listaINS.splice(this.listaINS.findIndex(x => x.id == ins.id), 1);
    }
    
}
