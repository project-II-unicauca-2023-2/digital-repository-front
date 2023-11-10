import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSiNoComponent } from 'src/app/modulo2/componentBasic/dialog-si-no/dialog-si-no.component';
import { datosAside } from 'src/app/modulo2/models/datosAside';
import { totalCriteriaScore } from 'src/app/modulo2/models/totalCriteriaScore';
import { ExcelService } from 'src/app/modulo2/services/excel/excel.service';
import { PdfService } from 'src/app/modulo2/services/pdf/pdf.service';
import { ContractService } from 'src/app/services/contract.service';
import { ScoreCriteriaService } from 'src/app/services/score-criteria.service';
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit  {
  
  @Input() numContrato!: string;
  @Input() datosContrato!: datosAside;
  @ViewChildren('miTablaI') tablas!: QueryList<ElementRef>; 
  datosContratista!: datosAside;
  title = "Resultado de calificacion al Proveedor";
  valor = 4;
  maximo = 5;
  miDiccionario: { [key: string]: number } = {
    calidad: 4,
    ejecucion: 5,
    cumplimiento: 2
  };
  datosResultado!:totalCriteriaScore;
  constructor(
    public dialog: MatDialog,    
    private pdfService: PdfService,
    private excelService :ExcelService,
    private http: HttpClient,
    private servicioScore:ScoreCriteriaService,
    private servicioContrato:ContractService
    ) {}
    ngOnInit() {
      this.servicioScore.getResultadosEvaluacion(this.numContrato).subscribe((datos: totalCriteriaScore) => {
        this.datosResultado = datos; // Asignar los datos recibidos a la variable datosResultado
        console.log(this.datosResultado);
      });
    }
  obtenerClaves() {
    return Object.keys(this.miDiccionario);

  }
  getTotal(){    
    // return datosResultado.totalScore
    const values = Object.values(this.miDiccionario);
    const promedio = values.reduce((acc, curr) => acc + curr, 0) / values.length;
    
    return parseFloat(promedio.toFixed(1))
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  const dialogRef = this.dialog.open(DialogSiNoComponent, {
      width: '450px',
      data: {
        titulo: 'Calificacion de Proveedor',
        pregunta: 'Desea Imprimir la calificacion en el formato "PA-GA-5-FOR-39 v2.0"',
        tipo: "pregunta"
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí manejamos el resultado
        console.log('Se recibe el Resultado: ', result);
        if (result === true) {
          console.log(this.datosContrato
            );
          this.excelService.createNewExcel(this.datosContrato,this.datosResultado);
          
        }
      }
    });



  }
  
}

