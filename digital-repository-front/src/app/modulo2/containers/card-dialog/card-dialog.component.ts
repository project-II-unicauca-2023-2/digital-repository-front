import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ScoreCriteriaService } from 'src/app/services/score-criteria.service';
import { DialogSiNoComponent } from '../../componentBasic/dialog-si-no/dialog-si-no.component';
import { calificacion } from '../../models/calificacion';
import { descriptionCriteriaContract } from '../../models/descriptionCriteriaContract';
import { listCriteriaRate } from '../../models/listCriteriaRate';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent implements  OnChanges, OnInit {
  @Input() criterio: string="";
  @Input() descripcionCriterio: string="";
  @Input() contBotones:number=0; // trae 1 al ser el primero, 2 al ser cualquiera del medio, 3 al ser el ultimo por que varian los botones que se muestran segun ese criterio
  @Output() emisorNavegacion = new EventEmitter<number>(); //emisor que envia el indice para navegar entre interfaces
  @Output() emisorValor = new EventEmitter<number>(); //emisor que envia valor que se debe guardar en la posicion
  @Input() seleccionadoRadio!:number; //Este numero es el que si nos movemos atrass o adelante la oopcion puesta paresca almaceda y se cargue en los radis
  @Input() seleccionadoRadioTodos!:listCriteriaRate[]; // todas contiene las anteriores selecciones
  @Input() dicPuntajes!: { [key: number]: string } ; // tiene las calificaciones de cada radio booton con su value
  @Input() numContrato!: string;
  @Input() criteriosDescripcion!: descriptionCriteriaContract; //contiene los id de criterios a calificar y el numero de contrato que se califico
  seleccionado=0;
  checked = false;
  indeterminate = false;
  disabled = false;
 toastrSvc!: ToastrService;
  //diccionarioCriterios!: { [key: number]: string };
  

  constructor(
    public dialog: MatDialog, 
    private servicioCriterios: ScoreCriteriaService,
    private ruta:Router
    ){
  }
  ngOnInit(): void {
    //alert(this.numContrato);
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
    //console.log('El valor seleccionado es: ' + this.seleccionadoRadio);

  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let contarCeros = this.seleccionadoRadioTodos.filter(item => item.rate === 0).length; // Filtra los elementos iguales a cero y cuenta su longitud
    let textoAlerta= "";
    let tipo= "";
    //alert(this.seleccionadoRadioTodos.length.toString() + " " + (this.seleccionadoRadioTodos[this.seleccionadoRadioTodos.length - 1] === 0));
    if((this.contBotones===3)&&(this.seleccionadoRadioTodos[this.seleccionadoRadioTodos.length-1].rate===0)
    && this.seleccionadoRadio !==0){/**hasta no precionar otro boton no se almacen entonces toc averiguar si se preciono en la ultima interfz */
      contarCeros=contarCeros-1 /// quiere decir que se evaluo en la ultima interfaz pero no se ha registado
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
          let valoresCalificaciones: listCriteriaRate[] = [...this.seleccionadoRadioTodos];
          valoresCalificaciones[valoresCalificaciones.length-1].rate=this.seleccionadoRadio;
          for(let i=0;i<this.criteriosDescripcion.criteria.length;i++){
            valoresCalificaciones[i].criteriaId=this.criteriosDescripcion.criteria[i].id;
          }
          
          //enviar la calidifacion a la bd
          const calificacionEnviada: calificacion = {
            listCriteriaRate: valoresCalificaciones, // Puedes llenar este array con más instancias según sea necesario
            contractMask: this.numContrato
          };
          console.log("CALIFICACIONES ENVIAR"+JSON.stringify(calificacionEnviada));
          this.servicioCriterios.addCalificaciones(calificacionEnviada).subscribe(
            {
              next: (res)=>{
                console.log(res)
                if (res.status == 200) {
                  console.log('Contrato agregado Correctamente', '');
                  this.ruta.navigate(['/homePage/Evaluacion', this.numContrato ]);
                }
              } ,
              error: (error)=>{
                 console.error(error);
                 console.log(`Error :  ${error.error.data.error}`);
              }
      
            }
          );
          //redirige a proxima interfaz
          //this.navegar(1);
          //
          
        }
      }
    });
  }
}
