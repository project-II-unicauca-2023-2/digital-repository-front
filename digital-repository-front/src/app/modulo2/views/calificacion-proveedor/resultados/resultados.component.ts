import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSiNoComponent } from 'src/app/modulo2/componentBasic/dialog-si-no/dialog-si-no.component';
import { ExcelService } from 'src/app/modulo2/services/excel/excel.service';
import { PdfService } from 'src/app/modulo2/services/pdf/pdf.service';
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {
  @ViewChildren('miTablaI') tablas!: QueryList<ElementRef>; 
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

  constructor(
    public dialog: MatDialog,    
    private pdfService: PdfService,
    private excelService :ExcelService,
    private http: HttpClient
    ) {}

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
        // Aquí manejamos el resultado
        console.log('Se recibe el Resultado: ', result);
        if (result === true) {
          //this.pdfService.generarPDFsDeTabla(this.tablas.toArray());
          //this.excelService.replaceCellsInExcel();
          this.excelService.createNewExcel();
        }
      }
    });
  }
  
}