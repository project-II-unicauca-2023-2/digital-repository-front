import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  constructor(){
  }
  ngOnInit(): void {
    alert(this.seleccionadoRadio +" <- FORMULRIO RECIBE EL ");
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
}
