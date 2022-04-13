import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { MenuComponent } from './componentes/menu/menu.component';
import { TituloComponent } from './componentes/titulo/titulo.component';

import { ReactiveFormsModule} from '@angular/forms';
import { TitulosDirective } from './directivas/titulos.directive';
import { ApellidonombrePipe } from './pipes/apellidonombre.pipe';
import { EdadPipe } from './pipes/edad.pipe';
import { ModalConfirmacionComponent } from './componentes/modal-confirmacion/modal-confirmacion.component';
import { ListaCursosComponent } from './componentes/lista-cursos/lista-cursos.component';
import { AbmCursoComponent } from './componentes/abm-curso/abm-curso.component';
import { AbmUsuarioComponent } from './componentes/abm-usuario/abm-usuario.component';
import { UsuarioService } from './servicios/usuario.service';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TituloComponent,
    TitulosDirective,
    ApellidonombrePipe,
    EdadPipe,
    ModalConfirmacionComponent,
    ListaCursosComponent,
    AbmCursoComponent,
    AbmUsuarioComponent,
    ListaUsuariosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
//providers: [AlumnoService], hace que se cree una unica instancia del servicio en toda la aplicacion