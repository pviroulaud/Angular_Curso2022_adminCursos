import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Curso } from '../../clases/curso';
import { CursoService } from 'src/app/servicios/curso.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.css']
})
export class AbmUsuarioComponent implements OnInit {

  usuario:Usuario=new Usuario(0,"","",new Date(),0,"",0,"","",1);
  titulo:string="Editar";
  fechaMaxima:string="";
  edita:boolean=true;
  roles:any[]=[];
  soloLectura:boolean=false;
  cursosDisponibles:Curso[]=[];
  

  frm:FormGroup=new FormGroup({
    legajo:new FormControl(''),
    nombre: new FormControl('',[Validators.required,Validators.minLength(3)]),
    apellido: new FormControl('',[Validators.required,Validators.minLength(3)]),
    sexo:new FormControl('0',Validators.required),
    fechaNac: new FormControl(new Date(),Validators.required),
    edad: new FormControl(0),
    dni:new FormControl('',[Validators.required,Validators.min(1000000),Validators.max(99999999)]),
    email:new FormControl('',[Validators.required,Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
    telefono:new FormControl(''),
    direccion:new FormControl('',Validators.required),
    rol:new FormControl('1',Validators.required),
    cursos:new FormControl('0')
  });


  constructor(private servicioCursos:CursoService, private servicioUsuario:UsuarioService,public refDialog: MatDialogRef<AbmUsuarioComponent>, 
              @Inject(MAT_DIALOG_DATA) public data:{datosUsr:Usuario,rolesPermitidos:any[],soloLectura:boolean}) {
    if (data.datosUsr.id==0)
    {
      this.titulo="Nuevo";
      this.edita=false;
    }
    else{
      this.titulo="Editar";
      this.edita=true;
    }
      this.usuario=data.datosUsr;
      this.roles=data.rolesPermitidos;
      this.soloLectura=data.soloLectura;
      this.cursosDisponibles=this.servicioCursos.getCursos();
   }

  ngOnInit(): void {
    let hoy:Date=new Date();
    let dia:string="";
    let mes:string="";
    if (hoy.getDate() >= 10) {
      dia = hoy.getDate().toString();
    }
    else{
      dia = '0' + hoy.getDate().toString();
    }
    if ((hoy.getMonth()+1) >= 10) {
      mes = (hoy.getMonth()+1).toString();
    }
    else{
      mes = '0' + (hoy.getMonth()+1).toString();
    }
    this.fechaMaxima=hoy.getFullYear().toString()+'-'+mes+'-'+dia  
  }

  agregarCurso(){
    let c=this.servicioCursos.getCurso(this.frm.value.cursos);

    this.servicioUsuario.asignarCurso(this.usuario,c);

  }
  quitarCurso(alumnoId:number,cursoId:number){

    this.servicioUsuario.desasignarCurso(this.usuario,this.servicioCursos.getCurso(cursoId)!);

  }

  aplicar()
  {
    
    if (this.frm.valid)
    {
      if (this.edita)
      {        
        this.refDialog.close(this.usuario);
      }
      else
      {
        this.refDialog.close(this.usuario);
      }
    }        
  }
}
