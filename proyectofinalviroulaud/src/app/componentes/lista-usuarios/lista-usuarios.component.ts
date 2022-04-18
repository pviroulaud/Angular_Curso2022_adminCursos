import { AfterViewInit, Component, Input, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacionComponent} from '../modal-confirmacion/modal-confirmacion.component';
import { MatTable, MatTableDataSource} from '@angular/material/table'
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { RolesService } from '../../servicios/roles.service';
import { AbmUsuarioComponent } from '../abm-usuario/abm-usuario.component';
import { Usuario } from '../../clases/usuario';
import {MatPaginator} from '@angular/material/paginator';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css',
              '../../app.component.css'],
  providers:[UsuarioService]
})
export class ListaUsuariosComponent implements OnInit , OnDestroy, AfterViewInit{

  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  @Input() tipoLista:string="Alumno";

  nombreColumnas:string[]=["id","nombre","dni","email","telefono","editar"];
  listaUS: Usuario[]=[];
  tituloLista:string="Listado de Usuarios";
  rol:any=[];
  //datasource!:any[];
  ds:any;
 
  usuario$?:Observable<Usuario[]>;

  suscripcion:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog:MatDialog, private servicioUsuario:UsuarioService, private servicioRoles:RolesService) { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {

    let rl=this.servicioRoles.getRolPorNombre(this.tipoLista);
    this.rol=[{id:rl.id,nombre:rl.nombre}];


    switch (this.tipoLista) {
      case "Alumno":
        this.tituloLista="Listado de Alumnos";
        break;
    case "Administrador":
        this.tituloLista="Listado de Administradores";
        break;
    case "Profesor":
        this.tituloLista="Listado de Profesores";
        break;
        case "Usuario":
          this.tituloLista="Listado de Usuarios";
          this.rol=this.servicioRoles.getRoles();
        break;

      default:
        this.tituloLista="Listado";
        break;
    }
    
    this.usuario$=this.servicioUsuario.getUsuariosOBS()
    this.suscripcion=this.usuario$.subscribe((datos)=>{
      this.listaUS = datos;
      //this.datasource = this.listaUS;
      
      this.ds= new MatTableDataSource<Usuario>(this.listaUS);
      this.table.renderRows();

     
    })


      this.obtenerUsuarios();

    
  }



  ngAfterViewInit() {
   this.ds.paginator = this.paginator;
  }

  
  obtenerUsuarios(){
    if(this.tipoLista=="Usuario"){
      this.servicioUsuario.getUsuarios();
      //this.listaUS=this.servicioUsuario.getUsuarios();
    }else{
      this.servicioUsuario.getUsuariosPorRol(this.rol[0].id);
      //this.listaUS=this.servicioUsuario.getUsuariosPorRol(this.rol[0].id);
    }
  }

  verUsuario(al:Usuario){
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(al.id,al.nombre,al.apellido,al.fechaNacimiento,al.dni,al.correoElectronico,al.telefono,al.sexo,al.direccion,al.rol),
                                    rolesPermitidos:this.rol,
                                    soloLectura:true}});

      refDialog.afterClosed().subscribe(result => {
      this.servicioUsuario.updateUsuario(result);
      this.table.renderRows();

      //this.obtenerUsuarios();

      this.ds.paginator = this.paginator;
      });    
  }

  editarUsuario(al:Usuario){
 
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(al.id,al.nombre,al.apellido,al.fechaNacimiento,al.dni,al.correoElectronico,al.telefono,al.sexo,al.direccion,al.rol),
                                                              rolesPermitidos:this.rol,
                                                              soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      this.servicioUsuario.updateUsuario(result)
      this.table.renderRows();

      // this.obtenerUsuarios();

       this.ds.paginator = this.paginator;
    });    
  }


  altaUsuario()
  {
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(0,"","",new Date(),0,"",0,"","",1),
                                                          rolesPermitidos:this.rol,
                                                          soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
      this.servicioUsuario.addUsuario(result);
        this.table.renderRows();
        // this.obtenerUsuarios();

         this.ds.paginator = this.paginator;
      }
      
    });

  }
  eliminarUsuario(al:Usuario){

    const refDialog=this.dialog.open(ModalConfirmacionComponent,{data:{titulo:"Eliminar "+this.tipoLista,subTitulo:"¿Esta seguro?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        this.servicioUsuario.deleteUsuario(al);
        this.table.renderRows();
        //this.obtenerUsuarios();
         this.ds.paginator = this.paginator;  
      }
    });
  }
}
