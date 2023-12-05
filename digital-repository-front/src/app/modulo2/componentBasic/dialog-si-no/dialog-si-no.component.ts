import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-si-no',
  templateUrl: './dialog-si-no.component.html',
  styleUrls: ['./dialog-si-no.component.css']
})
export class DialogSiNoComponent implements OnInit {
  titulo: string = "";
  pregunta: string = "";
  tipo: string = "";
  asterisco=false;
  aceptaCondiciones: boolean = false; 
  respuestaNegativa="";
  respuestaPositiva="";
  textoAlerta: string="";
  mostrarBotonContinuar=true;
  constructor(
    public dialogRef: MatDialogRef<DialogSiNoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.titulo = data.titulo;
    this.pregunta = data.pregunta;
    this.tipo = data.tipo;
    this.textoAlerta= data.textoAlerta;
    this.respuestaPositiva=data.respuestaPositiva
  }
  ngOnInit(): void {
    if (this.tipo =="pregunta" ){
      this.pregunta="¿"+this.pregunta+"?";
      this.aceptaCondiciones=true;
      this.respuestaNegativa="No";
      this.respuestaPositiva="Si";
    }
    if (this.tipo =="aceptacion" ){
      this.asterisco=true;
      this.respuestaNegativa="Cancelar";
      this.respuestaPositiva="Continuar";
    }
    if (this.tipo =="cancelar" ){
      this.respuestaNegativa="Cancelar";
      this.respuestaPositiva="Cancelar";
      this.mostrarBotonContinuar=false;
    }
    if (this.tipo =="soloOpcionAceptar" ){
      this.respuestaNegativa="aceptar";
      this.aceptaCondiciones=true;
      this.mostrarBotonContinuar=false;
    }
    if (this.tipo =="preguntaPersonalizable" ){
      this.aceptaCondiciones=true;
      this.respuestaNegativa="Cancelar";
    }
  }
  
  onConfirmClick(): void {
    // Aquí muestro la respuesta que me interesa devolver
    //console.log('El usuario ha seleccionado "Sí"');
    this.dialogRef.close(true); // Cierra el diálogo y pasa 'true' como resultado
  }
}
