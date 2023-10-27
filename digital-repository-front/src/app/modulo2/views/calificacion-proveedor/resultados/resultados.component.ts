import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSiNoComponent } from 'src/app/modulo2/componentBasic/dialog-si-no/dialog-si-no.component';
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {
  title = "Resultado de calificacion al Proveedor";
  valor = 4;
  maximo = 5;
  miDiccionario: { [key: string]: number } = {
    calidad: 4,
    ejecucion: 5,
    cumplimiento: 2
  };

  obtenerClaves() {
    return Object.keys(this.miDiccionario);
  }
  getTotal(){    
    const values = Object.values(this.miDiccionario);
    const promedio = values.reduce((acc, curr) => acc + curr, 0) / values.length;
    
    return parseFloat(promedio.toFixed(1))
  }

  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogSiNoComponent, {
      width: '250px',
      data: {
        titulo: 'Calificacion de Proveedor',
        pregunta: 'Desea Imprimir la calificacion'
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar el resultado que recibes del diálogo
        console.log('Se recibe el Resultado: ', result);
        if (result === true) {
          alert('Impresión en progreso');
        }
      }
    });
  }
  
}