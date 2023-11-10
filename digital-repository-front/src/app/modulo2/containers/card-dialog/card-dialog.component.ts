import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScoreCriteriaService } from 'src/app/services/score-criteria.service';
import { DialogSiNoComponent } from '../../componentBasic/dialog-si-no/dialog-si-no.component';

interface dicCriteria {
  dicPuntaje: { [key: number]: string };
}
@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent implements  OnChanges {
  @Input() criterio: string="";
  @Input() descripcionCriterio: string="";
  @Input() contBotones:number=0;
  @Output() emisorNavegacion = new EventEmitter<number>();
  @Output() emisorValor = new EventEmitter<number>();
  @Input() seleccionadoRadio!:number;
  @Input() seleccionadoRadioTodos!:number[];
  @Input() dicPuntajes!: { [key: number]: string } ;
  seleccionado=0;
  checked = false;
  indeterminate = false;
  disabled = false;
  diccionarioCriterios!: { [key: number]: string };
  constructor(
    public dialog: MatDialog, 
    private servicioCriterios: ScoreCriteriaService
    ){
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seleccionado'] && !changes['seleccionado'].firstChange) {
      this.seleccionado = changes['seleccionado'].currentValue;
    }
  }
  getPuntaje() {
    return Object.keys(this.dicPuntajes);
  }
  
  /***
   * informa al contenedor padre que a que indice se debe mover
   */
  navegar(varNavegacion:number)
  {
    this.emisorNavegacion.emit(varNavegacion);
    this.almacenaValor( this.seleccionadoRadio);//cuando no sea cambiado el valor disparamos el metodo automaticamente para no perder cambios
    this.emisorValor.emit(this.seleccionadoRadio);
  }
  /***
   * cuando se cambia el radio se dispara este metodo para almacenar el valor
   */
  almacenaValor(value: any) {
    this.seleccionadoRadio = value; // Actualiza el valor seleccionado
    console.log('El valor seleccionado es: ' + this.seleccionadoRadio);

  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let contarCeros = this.seleccionadoRadioTodos.filter(item => item === 0).length; // Filtra los elementos iguales a cero y cuenta su longitud
    let textoAlerta= "";
    let tipo= "";
    //alert(this.seleccionadoRadioTodos.length.toString() + " " + (this.seleccionadoRadioTodos[this.seleccionadoRadioTodos.length - 1] === 0));
    if((this.contBotones===3)&&(this.seleccionadoRadioTodos[this.seleccionadoRadioTodos.length-1]===0)
    && this.seleccionadoRadio !==0){/**hasta no precionar otro boton no se almacen entonces toc averiguar si se preciono en la ultima interfz */
      contarCeros=contarCeros-1 /// quiere decir que se evluo en la ultima interfaz pero no se ha registado
    }
    if((contarCeros === 0)){
      tipo= "aceptacion"
    }else{
        textoAlerta= "Hay " + contarCeros + " criterios sin evaluar"
        tipo= "cancelar"
     
    }
    const dialogRef = this.dialog.open(DialogSiNoComponent, {
      width: '40%',
      data: {
        titulo: 'Finalizacion de la Evaluacion de Proveedor',
        pregunta: 'Una vez aceptado, el formulario de calificación de proveedor se considera finalizado y no será posible realizar modificaciones. Le recomendamos revisar detenidamente la información antes de proceder con el envío, ya que implicará la aceptación de los términos sin posibilidad de rectificación posterior.',
        tipo: tipo,
        textoAlerta: textoAlerta
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí manejamos el resultado
        console.log('Se recibe el Resultado: ', result);
        if (result === true) {
          // que continue en esta pgina o lo deje abndonr
          this.navegar(1);
        }
      }
    });
  }
}
