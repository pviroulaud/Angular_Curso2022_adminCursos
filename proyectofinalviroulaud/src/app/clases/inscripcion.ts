export class Inscripcion
{
    id :number=0;
    idAlumno:number=0;
    idCurso:number=0;
    fechaInscripcion:Date=new Date();

    constructor(id:number,idAlumno:number,idCurso:number,fechaInscripcion:Date)
    {
        this.id=id;
        this.idAlumno=idAlumno;
        this.idCurso=idCurso;
        this.fechaInscripcion=fechaInscripcion;        
    }
}