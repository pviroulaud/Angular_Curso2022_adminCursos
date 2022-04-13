import { Injectable } from '@angular/core';
import { Curso } from '../clases/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  listaCur: Curso[] = [];

   

  constructor() {
    this.listaCur = [ new Curso(1, "Curso1", "Descripcion1",100,3,2,new Date()),  
    new Curso(2, "Curso2", "Descripcion2",100,3,2,new Date()),
    new Curso(3, "Curso3", "Descripcion3",100,3,2,new Date()),
    new Curso(4, "Curso4", "Descripcion4",100,3,2,new Date()),
    ];
   }

    getCursos() {
      return this.listaCur;
    }
    updateCurso(cur: Curso) { 
      this.listaCur[this.listaCur.findIndex(x => x.id == cur.id)] = cur;
    }
    deleteCurso(cur: Curso) {
      this.listaCur.splice(this.listaCur.findIndex(x => x.id == cur.id), 1);
    }
    addCurso(cur: Curso) {
      cur.id = this.obtenerSiguienteId() + 1;
      this.listaCur.push(cur);
    }

    getCurso(id: number) {  
      return this.listaCur[this.listaCur.findIndex(x => x.id == id)];
    }

    obtenerSiguienteId(): number {
      let max = 0;
      for (let i = 0; i < this.listaCur.length; i++) {
        if (this.listaCur[i].id > max)
          max = this.listaCur[i].id;
      }
      return max;
    }

}