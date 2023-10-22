import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-si-no',
  templateUrl: './dialog-si-no.component.html',
  styleUrls: ['./dialog-si-no.component.css']
})
export class DialogSiNoComponent {
  titulo: string = "";
  pregunta: string = "";

  constructor(
    public dialogRef: MatDialogRef<DialogSiNoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.titulo = data.titulo;
    this.pregunta = data.pregunta;
  }

  
  onConfirmClick(): void {
    // Aquí muestro la respuesta que me interesa devolver
    console.log('El usuario ha seleccionado "Sí"');
    this.dialogRef.close(true); // Cierra el diálogo y pasa 'true' como resultado
  }
}
