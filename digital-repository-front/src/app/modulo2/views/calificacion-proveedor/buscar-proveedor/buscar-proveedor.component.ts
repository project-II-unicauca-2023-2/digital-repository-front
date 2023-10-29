import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buscar-proveedor',
  templateUrl: './buscar-proveedor.component.html',
  styleUrls: ['./buscar-proveedor.component.css']
})
export class BuscarProveedorComponent {

  contratoValido="" //variable que almacena el contrato valido y es emitido
  @Output() emisorIdContrato = new EventEmitter<string>();
  /**
   * hacer la validacion con la base de datos que el contrato se encuentre ademas 
   * recuperar el identificador y ese sera el que se use para recuperar el contenido es decier
   * el que se va a emitir
   */
  validarContrato(){
    this.emisorIdContrato.emit(this.contratoValido);
  }
  /**
   * se encarga de emitir el serial que identifica al contrato al padre para recuperacion de la informacion
   */
  emitirNoContrato(){
    this.emisorIdContrato.emit(this.contratoValido);
  }

}
