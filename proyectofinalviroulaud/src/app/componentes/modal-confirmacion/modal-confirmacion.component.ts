import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {

  titulo:string="";
  subTitulo:string="¿Esta seguro?";
  constructor(public refDialog: MatDialogRef<ModalConfirmacionComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) {
  
    this.titulo=data.titulo;
    if (data.subTitulo!=undefined)
    {
      this.subTitulo=data.subTitulo;
    }
  }

  ngOnInit(): void {
  }

  confirma()
  {
    this.refDialog.close(true);
  }
  cerrar()
  {
    this.refDialog.close(false);
  }
}
