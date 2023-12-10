import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSiNoComponent } from 'src/app/modulo2/componentBasic/dialog-si-no/dialog-si-no.component';
import { datosAside } from 'src/app/modulo2/models/datosAside';
import { idContrato } from 'src/app/modulo2/models/idContrato';
import { scoreCriteria } from 'src/app/modulo2/models/scoreCriteria';
import { totalCriteriaScore } from 'src/app/modulo2/models/totalCriteriaScore';
import { ExcelService } from 'src/app/modulo2/services/excel/excel.service';
import { ScoreCriteriaService } from 'src/app/services/score-criteria.service';

interface dicCriteria {
  dicPuntaje: { [key: number]: string };
}
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})

export class ResultadosComponent implements OnInit  {
  
  @Input() numContrato!: idContrato;
  @Input() datosContrato!: datosAside;
  @ViewChildren('miTablaI') tablas!: QueryList<ElementRef>; 
  datosContratista!: datosAside;
  title = "Resultado de calificación al Proveedor";
  valor = 4;
  maximo = 5;
  miDiccionario: { [key: string]: number } = {
    calidad: 4,
    ejecucion: 5,
    cumplimiento: 2
  };
  misCriterios!:scoreCriteria[];
  datosResultado!:totalCriteriaScore;
  constructor(
    public dialog: MatDialog,    
    private excelService :ExcelService,
    private http: HttpClient,
    private servicioScore:ScoreCriteriaService,
    private cdr: ChangeDetectorRef
    ) {
      
    }
    ngOnInit() {
      this.servicioScore.getResultadosEvaluacion(this.numContrato).subscribe((datos: totalCriteriaScore) => {
        this.datosResultado = datos; // Asignar los datos recibidos a la variable datosResultado
        //console.log("onInit Tiene la respuesta completa de  ;"+JSON.stringify(this.datosResultado));
        this.misCriterios=this.datosResultado.listaScoreCriteria;
        //console.log("onInitTiene los criterios sacados son ;"+ this.misCriterios);
        this.cdr.detectChanges();
        this.servicioScore.getDominioCalificacion().subscribe(
          (data: dicCriteria) => {
            
            const diccionario: { [key: number]: string } = data.dicPuntaje;
            const keys = Object.keys(data.dicPuntaje);
          
            // Convertimos las claves a números y encontramos el máximo
            this.maximo = Math.max(...keys.map(Number));
          

            console.log("maximo segun criterias "+this.maximo);
      
          },
          (error) => {
            // Manejo de errores
            console.error('Ocurrió un error al obtener los datos:', error);
          }
        );
      });
    }
    ngOnChanges(changes: SimpleChanges) {
      if(changes['datosResultado'] ) {
        // Realiza las acciones necesarias cuando datosResultado cambia
        this.getcriterios();
        //console.log('Datos resultado cambiado:', this.datosResultado);
      }
    }
  obtenerClaves() {
    return Object.keys(this.miDiccionario);

  }
  getTotal(){    
     // Verificar si datosResultado está definido antes de acceder a totalScore
  if (this.datosResultado && this.datosResultado.totalScore) {
   // console.log(this.datosResultado.totalScore+ " "+this.datosResultado.scoreCriteriaArray);
    return this.datosResultado.totalScore;
  } else {
    // Si datosResultado no está definido o totalScore es undefined, devolver un valor predeterminado
    return 0; 
  }
    //const values = Object.values(this.miDiccionario);
    //const promedio = values.reduce((acc, curr) => acc + curr, 0) / values.length;
    
    //return parseFloat(promedio.toFixed(1))
  }
  getcriterios(){    
 if (this.datosResultado && this.datosResultado.listaScoreCriteria) {
  
   return this.datosResultado.listaScoreCriteria;
 } else {
   // Si datosResultado no está definido o totalScore es undefined, devolver un valor predeterminado
   return []; 
 }
   //const values = Object.values(this.miDiccionario);
   //const promedio = values.reduce((acc, curr) => acc + curr, 0) / values.length;
   
   //return parseFloat(promedio.toFixed(1))
 }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  const dialogRef = this.dialog.open(DialogSiNoComponent, {
      width: '450px',
      data: {
        titulo: 'Calificación de Proveedor',
        pregunta: 'Desea Imprimir la calificación en el formato "PA-GA-5-FOR-39 v2.0"',
        tipo: "pregunta"
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí manejamos el resultado
        //console.log('Se recibe el Resultado: ', result);
        if (result === true) {
         // console.log(this.datosContrato            );
          this.excelService.createNewExcel(this.datosContrato,this.datosResultado);
          
        }
      }
    });



  }
  
}

