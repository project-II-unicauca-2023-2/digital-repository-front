import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogSiNoComponent } from 'src/app/modulo2/componentBasic/dialog-si-no/dialog-si-no.component';
import { idContrato } from 'src/app/modulo2/models/idContrato';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-buscar-proveedor',
  templateUrl: './buscar-proveedor.component.html',
  styleUrls: ['./buscar-proveedor.component.css']
})
export class BuscarProveedorComponent implements OnInit {

  contratoValido: idContrato = new idContrato(); //variable que almacena el contrato valido y es emitido
  contratoEncontradoSinEvalucion = false; //bandera que permite continuar a la otra interfaz cuando el contrto no tiene un evaluacion pero existe
  AniosComboBox:string[]=[];
  anioSeleccionado!:string;
  @Output() emisorIdContrato = new EventEmitter<idContrato>();
  constructor(public dialog: MatDialog, 
    private servicioContrato: ContractService,
    private ruta :Router
    ) {
    
    
    }
  ngOnInit(): void {
    this.cargarAniosCombo();
  }
  cargarAniosCombo(){
    let anioActual= new Date().getFullYear();
    this.contratoValido.anio=anioActual+"";
    for(let a=1995;a<=anioActual;a++){      
      this.AniosComboBox.push(a+"");
    } 
  }

  recibidoAnio(anio: string){
    this.contratoValido.anio=anio;
  }
  /**
   * hacer la validacion con la base de datos que el contrato se encuentre ademas 
   * recuperar el identificador y ese sera el que se use para recuperar el contenido es decier
   * el que se va a emitir
   */

  validarContrato() {
    let mensajeError="";
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
            mensajeError=" El contrato ya tiene una evaluación registrada.";
            this.openDialog('500ms', '500ms', mensajeError,"preguntaPersonalizable","Abrir Evaluación")// en caso contrario muestr error sin salir de la vista
          }
        });
      }
      else{  
        //mensajeError=" El contrto tiene ya una evaluacion registrada";
        //this.openDialog('500ms', '500ms', mensajeError,"preguntaPersonalizable","Abrir Evaluacion")// en caso contrario muestr error sin salir de la vista
   
        mensajeError=" El contrato No existe en la base de datos asegurese de tener bien escrita la mascara y que cooresponda al año.";
        this.openDialog('500ms', '500ms',mensajeError,"soloOpcionAceptar","")// en caso contrario muestr error sin salir de la vista
      }
    });



  }


  /**
   * se encarga de emitir el serial que identifica al contrato al padre para recuperacion de la informacion
   */
  emitirNoContrato() {
    this.emisorIdContrato.emit(this.contratoValido);
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, mensajeError:string, tipo:string,respuestaPositiva:string): void {
    const dialogRef = this.dialog.open(DialogSiNoComponent, {
      width: '400px',
      data: {
        titulo: 'Calificación de Proveedor',
        pregunta: mensajeError,
        tipo:tipo ,
        respuestaPositiva:respuestaPositiva
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
    if(tipo=="preguntaPersonalizable"){
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Aquí manejamos el resultado
          console.log('Se recibe el Resultado: ', result);
          this.ruta.navigate(['/homePage/Evaluacion', this.contratoValido.mascara,this.contratoValido.anio  ]);
        }
      });
    }
  }
}
