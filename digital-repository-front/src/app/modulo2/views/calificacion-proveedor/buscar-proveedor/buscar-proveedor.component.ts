import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSiNoComponent } from 'src/app/modulo2/componentBasic/dialog-si-no/dialog-si-no.component';

@Component({
  selector: 'app-buscar-proveedor',
  templateUrl: './buscar-proveedor.component.html',
  styleUrls: ['./buscar-proveedor.component.css']
})
export class BuscarProveedorComponent {

  contratoValido="" //variable que almacena el contrato valido y es emitido
  contratoEncontradoSinEvalucion=true; //bandera que permite continuar a la otra interfaz


  @Output() emisorIdContrato = new EventEmitter<string>();
  constructor(public dialog: MatDialog){

  }
  /**
   * hacer la validacion con la base de datos que el contrato se encuentre ademas 
   * recuperar el identificador y ese sera el que se use para recuperar el contenido es decier
   * el que se va a emitir
   */
  validarContrato(){
    //TODO: aqui se debe validar que el contrato exista y no tenga evluaciones
    if(this.contratoEncontradoSinEvalucion){
      this.emisorIdContrato.emit(this.contratoValido);
    }else{
      this.openDialog('250ms', '100ms');
    }
  }
  /**
   * se encarga de emitir el serial que identifica al contrato al padre para recuperacion de la informacion
   */
  emitirNoContrato(){
    this.emisorIdContrato.emit(this.contratoValido);
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogSiNoComponent, {
        width: '250px',
        data: {
          titulo: 'Calificacion de Proveedor',
          pregunta: 'Contranto no existente o ya tiene una evaluacion registrada',
          tipo: "soloOpcionAceptar"
        },
        enterAnimationDuration,
        exitAnimationDuration,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Aquí manejamos el resultado
          console.log('Se recibe el Resultado: ', result);
          if (result === true) {
           
          }
        }
      });
    }
}
