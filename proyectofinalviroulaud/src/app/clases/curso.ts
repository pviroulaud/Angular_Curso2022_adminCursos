import { Usuario } from "./usuario";

export class Curso
{
    id : number = 0;
    nombre : string = "";   
    descripcion : string = "";
    clasesSemanales : number = 0;
    totalClases:number=0;
    profesorId:number=0;
    fechaInicio:Date=new Date();
    cupo:number=0;

    constructor(id:number,nombre:string,descripcion:string,cupo:number,totalClases:number,clasesSemanales:number,fechaInicio:Date)
    {
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.clasesSemanales=clasesSemanales;
        this.fechaInicio=fechaInicio;
        this.cupo=cupo;        
        this.totalClases=this.clasesSemanales;        
    }
    setProfesor(profesor:Usuario){
        this.profesorId=profesor.id;
    }
    setProfesorId(id:number){
        this.profesorId=id;
    }
}