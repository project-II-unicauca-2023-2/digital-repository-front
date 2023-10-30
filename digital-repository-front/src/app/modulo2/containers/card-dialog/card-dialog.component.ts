import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSiNoComponent } from '../../componentBasic/dialog-si-no/dialog-si-no.component';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent implements OnInit {
  @Input() criterio: string="";
  @Input() descripcionCriterio: string="";
  @Input() contBotones:number=0;
  @Output() emisorNavegacion = new EventEmitter<number>();
  @Output() emisorValor = new EventEmitter<number>();
  @Input() seleccionadoRadio!:number;
  @Input() seleccionadoRadioTodos!:number[];
  seleccionado=0;
  checked = false;
  indeterminate = false;
  disabled = false;
  dicPuntaje: { [key: number]: string } = {
    1: "No cumple",
    2: "Minimamente",
    3: "Parcialmente",
    4: "Plenamente",
    5: "Supera expectativas"
  };
  constructor(
    public dialog: MatDialog,    ){
  }
  ngOnInit(): void {
    //alert(this.seleccionadoRadio +" <- FORMULRIO RECIBE EL ");
  }
  getPuntaje() {
    return Object.keys(this.dicPuntaje);
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
    if(contarCeros === 0){
      textoAlerta=""
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
        tipo: "aceptacion",
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
