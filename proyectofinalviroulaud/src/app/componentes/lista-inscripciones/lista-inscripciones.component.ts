import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Curso } from 'src/app/clases/curso';
import { Inscripcion } from 'src/app/clases/inscripcion';
import { Usuario } from 'src/app/clases/usuario';
import { CursoService } from 'src/app/servicios/curso.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AbmInscripcionComponent } from '../abm-inscripcion/abm-inscripcion.component';
import { InscripcionService } from '../../servicios/inscripcion.service';
import { MatTableDataSource } from '@angular/material/table';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.css',
              '../../app.component.css']
})
export class ListaInscripcionesComponent implements OnInit , AfterViewInit {

  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  nombreColumnas:string[]=["id","alumno","curso","fechaInscripcion","editar"];
  listaIns: Inscripcion[]=[];
  
  constructor(public dialog:MatDialog, private servicioCurso:CursoService, private servicioUsuario:UsuarioService, private servicioInscripcion:InscripcionService) { }

  ngOnInit(): void {
    this.obtenerInscripciones();
    this.dataSource= new MatTableDataSource<Inscripcion>(this.listaIns);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  obtenerUsuario(id:number):Usuario{
    return this.servicioUsuario.getUsuario(id)!;
  }

  obtenerCurso(id:number):Curso{

    return this.servicioCurso.getCurso(id)!;
  }

  obtenerInscripciones(){
      
      this.listaIns=this.servicioInscripcion.getInscripciones();
    }
  altaInscripcion()
  {
    const refDialog=this.dialog.open(AbmInscripcionComponent,{data:{datosInscripcion:new Inscripcion(0,0,0,new Date()),
        cursos:this.servicioCurso.getCursos(),
        usuarios:this.servicioUsuario.getUsuarios()}});
    refDialog.afterClosed().subscribe(result=>{
      if(result!=undefined)
      {
        this.servicioInscripcion.addInscripcion(result);
        this.obtenerInscripciones();
        this.dataSource.paginator = this.paginator;
      }
    }
    );      
  }

  editarInscripcion(ins:Inscripcion)
  {
    const refDialog=this.dialog.open(AbmInscripcionComponent,{data:{datosInscripcion:ins,
        cursos:this.servicioCurso.getCursos(),
        usuarios:this.servicioUsuario.getUsuarios()}});
    refDialog.afterClosed().subscribe(result=>{
      if(result!=undefined)
      {
        this.servicioInscripcion.updateInscripcion(result);
        this.obtenerInscripciones();
        this.dataSource.paginator = this.paginator;
      }
    }
    );
  }
  
  eliminarInscripcion(ins:Inscripcion)
  {
    const refDialog=this.dialog.open(ModalConfirmacionComponent,{data:{titulo:"Eliminar Inscripcion",subTitulo:"¿Esta seguro?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        this.servicioInscripcion.deleteInscripcion(ins);
        this.obtenerInscripciones();
        
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
