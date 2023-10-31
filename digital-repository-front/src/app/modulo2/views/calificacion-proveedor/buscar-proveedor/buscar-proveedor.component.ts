import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSiNoComponent } from 'src/app/modulo2/componentBasic/dialog-si-no/dialog-si-no.component';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-buscar-proveedor',
  templateUrl: './buscar-proveedor.component.html',
  styleUrls: ['./buscar-proveedor.component.css']
})
export class BuscarProveedorComponent implements OnInit {

  contratoValido = "" //variable que almacena el contrato valido y es emitido
  contratoEncontradoSinEvalucion = false; //bandera que permite continuar a la otra interfaz cuando el contrto no tiene un evaluacion pero existe

  @Output() emisorIdContrato = new EventEmitter<string>();
  constructor(public dialog: MatDialog, private servicioContrato: ContractService) {

  }
  ngOnInit(): void {

  }



  /**
   * hacer la validacion con la base de datos que el contrato se encuentre ademas 
   * recuperar el identificador y ese sera el que se use para recuperar el contenido es decier
   * el que se va a emitir
   */

  validarContrato() {

    this.servicioContrato.getExisteContrato(this.contratoValido).subscribe((existeContrato: boolean) => {///consult a l base de datos para saver si existe
      this.contratoEncontradoSinEvalucion = false;
      if(existeContrato){
        this.servicioContrato.getExisteEvaluacion(this.contratoValido).subscribe((existeEvaluacion: boolean) => {//consulta a la bse de datos para saber si el contraro no tiene aun evluacion
  
          if (!existeEvaluacion) {//se permite continuar solo cuando no ha sido registradas evaluaciones 
            this.contratoEncontradoSinEvalucion = true;
          }
  
          if (this.contratoEncontradoSinEvalucion) {
            this.emisorIdContrato.emit(this.contratoValido);// hace la emicion de la varible
          } else {
            this.openDialog('500ms', '500ms')// en caso contrario muestr error sin salir de la vista
          }
        });
      }
      else{
        this.openDialog('500ms', '500ms')// en caso contrario muestr error sin salir de la vista
      }
    });



  }


  /**
   * se encarga de emitir el serial que identifica al contrato al padre para recuperacion de la informacion
   */
  emitirNoContrato() {
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
