import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CursoService } from 'src/app/servicios/curso.service';
import { Curso } from '../../clases/curso';
import { AbmCursoComponent } from '../abm-curso/abm-curso.component';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../clases/usuario';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css',
              '../../app.component.css'],
  providers: [CursoService,UsuarioService]
})
export class ListaCursosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  dataSource:any;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  nombreColumnas:string[]=["id","nombre","descripcion","totalClases","profesor","editar"];
  listaCur: Curso[]=[];

  constructor(public dialog:MatDialog, private servicioCurso:CursoService, private servicioUsuario:UsuarioService) { }

  ngOnInit(): void {
    this.obtenerCursos();
    this.dataSource= new MatTableDataSource<Curso>(this.listaCur);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  obtenerProfesor(id:number):Usuario{
    return this.servicioUsuario.getUsuario(id)!;

  }


  obtenerCursos(){
    
    this.servicioCurso.getCursosPromise().then((data)=>{
      this.listaCur=data;
      this.dataSource= new MatTableDataSource<Curso>(this.listaCur);
      this.table.renderRows();

      //this.obtenerUsuarios();

      this.dataSource.paginator = this.paginator;
    })
    .catch((err)=>{
      console.log(err);
    });

    //this.listaCur=this.servicioCurso.getCursos();
  }

  altaCurso()
  {
    const refDialog=this.dialog.open(AbmCursoComponent,{data:{datosCurso:new Curso(0,"","",0,0,0,new Date(),0),
                                                        profesores:this.servicioUsuario.getUsuariosPorRolId(2)}});

    refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
        this.servicioCurso.addCurso(result);
        this.obtenerCursos();

        this.dataSource.paginator = this.paginator;
      }
    });
  }
  editarCurso(cur:Curso){
    const refDialog=this.dialog.open(AbmCursoComponent,{data:{datosCurso: new Curso(cur.id,cur.nombre,cur.descripcion,cur.cupo,cur.totalClases,cur.totalClases,cur.fechaInicio,cur.profesorId),
                                                              profesores:this.servicioUsuario.getUsuariosPorRolId(2)}});
    refDialog.afterClosed().subscribe(result => {
      this.servicioCurso.updateCurso(result);
      this.obtenerCursos();

      this.dataSource.paginator = this.paginator;
    });    
  }
  eliminarCurso(cur:Curso){
    const refDialog=this.dialog.open(ModalConfirmacionComponent,{data:{titulo:"Eliminar Curso",subTitulo:"¿Esta seguro?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        this.servicioCurso.deleteCurso(cur);
        this.obtenerCursos();
        
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
