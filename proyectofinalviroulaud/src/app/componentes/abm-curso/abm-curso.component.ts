import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import { Curso } from '../../clases/curso';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-abm-curso',
  templateUrl: './abm-curso.component.html',
  styleUrls: ['./abm-curso.component.css']
})
export class AbmCursoComponent implements OnInit {

  curso:Curso=new Curso(0,"","",0,0,0,new Date(),0);
  titulo:string="Editar";
  edita:boolean=true;
  profesores:Usuario[]=[];

  constructor(public refDialog: MatDialogRef<AbmCursoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:{datosCurso:Curso,profesores:Usuario[]}) 
    {
      console.log(data.profesores);
      this.profesores= data.profesores;
      if (data.datosCurso.id==0)
      {
        this.titulo="Nuevo";
        this.edita=false;
      }
      else{
        this.titulo="Editar";
        this.edita=true;
      }
        this.curso=data.datosCurso;
        
    }

  frm:FormGroup=new FormGroup({
    id:new FormControl(''),
    nombre: new FormControl('',[Validators.required,Validators.minLength(1)]),
    descripcion: new FormControl('',[Validators.required,Validators.minLength(3)]),
    fechaInicio: new FormControl(new Date(),Validators.required),
    fechaFin: new FormControl(new Date(),Validators.required),
    cupo: new FormControl(0,Validators.required),
    clasesSemanales: new FormControl(0,Validators.required),
    totalClases: new FormControl(0,Validators.required),
    profesor: new FormControl(0,Validators.required)
  });

  ngOnInit(): void {
  }


  aplicar()
  {
    if (this.frm.valid)
    {
      if (this.edita)
      {
        this.refDialog.close(this.curso);
      }
      else
      {
        this.refDialog.close(this.curso);
      }
    }
  }
}
