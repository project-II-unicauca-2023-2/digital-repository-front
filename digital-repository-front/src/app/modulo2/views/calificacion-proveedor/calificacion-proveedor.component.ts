import { Component, HostListener, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { ScoreCriteriaService } from 'src/app/services/score-criteria.service';
import { datosAside } from '../../models/datosAside';
import { descriptionCriteriaContract } from '../../models/descriptionCriteriaContract';
import { idContrato } from '../../models/idContrato';
import { listCriteriaRate } from '../../models/listCriteriaRate';
export interface Tile {
  criterio : string;
  descripcion : string;
}

interface dicCriteria {
  dicPuntaje: { [key: number]: string };
}
@Component({
  selector: 'app-calificacion-proveedor',
  templateUrl: './calificacion-proveedor.component.html',
  styleUrls: ['./calificacion-proveedor.component.css']
})
export class CalificacionProveedorComponent implements OnInit {
  tiles: Tile[] = [
    {criterio: 'criterio 1 ', descripcion: 'Lorem ipsum dolo'},
    {criterio: 'criterio 2 ', descripcion: 'Nulla facilisi. Aenean vel justo at risus tincidunt lobortis. Ut non tincidunt ante, vitae aliquet enim. Maecenas non semper ante. Sed vitae augue nec massa tincidunt posuere. Vivamus fringilla, turpis at volutpat accumsan, ipsum nisi luctus tellus, sit amet commodo nulla metus ut neque.'},
    {criterio: 'criterio 3 ', descripcion: 'Quisque non neque et sapien scelerisque finibus ut sit amet nunc. Nunc eu erat tristique, finibus neque in, tincidunt odio. Nullam sagittis sem in leo vulputate, sit amet tincidunt massa rhoncus. Integer nec hendrerit purus, sed tempor justo. In convallis risus vitae aliquet molestie. Sed malesuada dolor in nibh aliquet, a bibendum dui auctor.'},
  ];
   //calificacionesArray: number[] = [];// contiene la calificacion hecha de cada criterio
   calificacionesHechas:listCriteriaRate[];
   indexVistaActual: number = 0; // por defecto la primera vista se ve 0
   indexVistaMax: number = (this.tiles.length-1) +2; //total de calificaciones(-1 POR SER INDICE)+ 2 vistas mas (busqueda y resultados)
   dicPuntajes!: { [key: number]: string } ; //almacena que puntaje y valor tendran los radios de calificacion
   numContrato!:idContrato;
   datosContrato!:datosAside;
   criteriosDescripcion!:descriptionCriteriaContract;
  constructor(
    private servicioCriterios: ScoreCriteriaService,
    private servicioContrato: ContractService){
    let cantCriterios=this.tiles.length;
    //this.calificacionesArray = new Array(this.tiles.length).fill(0);
    this.calificacionesHechas = Array.from({ length: cantCriterios }, () => ({ criteriaId: -1, rate: 0 }));
    
  }
  ngOnInit(): void {
    window.onbeforeunload = () => this.confirmExit();
    //alert(this.seleccionadoRadio +" <- FORMULRIO RECIBE EL ");
    //capturamos los puntajes con que se evaluara en caso de pasar a el segundo c omponenete
    this.servicioCriterios.getDominioCalificacion().subscribe(
      (data: dicCriteria) => {
        //  los datos recibidos
        const diccionario: { [key: number]: string } = data.dicPuntaje;
        // Ejemplo de uso del diccionario
        console.log(diccionario);
  
        // mostrar  valores por clave
        //console.log(diccionario[1]); // Acceder a "No cumple"
        //console.log(diccionario[2]); // Acceder a "Minimamente"
        //console.log(diccionario[3]); // Acceder a "Parcialmente"
        //console.log(diccionario[4]); // Acceder a "Plenamente"
        //console.log(diccionario[5]); // Acceder a "Supera expectativas"
  
        // asigno el diccionario
        this.dicPuntajes = diccionario;
      },
      (error) => {
        // Manejo de errores
        console.error('Ocurrió un error al obtener los datos:', error);
      }
    );
  }
  actualizarCriterios(contrato: idContrato){
    this.servicioContrato.getTipoContratoCriteriosCoorespondientes(contrato).subscribe(
      (data: descriptionCriteriaContract) => {
        this.criteriosDescripcion=data;
        // Ejemplo de uso del diccionario
        console.log(JSON.stringify(this.criteriosDescripcion));
      },
      (error) => {
        // Manejo de errores
        console.error('Ocurrió un error al obtener los criterios:', error);
      }
    );
  }
  /**
   * navega a la proxima pagina y hace un llamado a recupera datos necesarios
   * @param contrato es el identificador del contrato ya balidado por la primera interfaz
   */

  recibidoIdContratoValido(contrato: idContrato) {
    this.actualizarCriterios(contrato);
    console.log("Contrato recibido: ", contrato.mascara);
    this.numContrato=contrato;
    this.indexVistaActual=this.indexVistaActual+1
  }
  recibidoBotonNavegacion(direccionNavegacion: number){

    this.indexVistaActual=this.indexVistaActual+direccionNavegacion;
  }
  /**
   * reciimos los datos del contrato del aside 
   * @param datosContratoAside 
   */
  recibidoDatosContrato(datosContratoAside: datosAside){
    this.datosContrato=datosContratoAside ;

  }
  
  /**
   * cuando un criterio es calificado lo llenamos en el arreglo
   */
  ingresarCalificacionCriterio(calificado:number, indice:number){
    //console.log("calificacionResivida en servicio"+calificado+" para criterio '"+this.tiles[indice].criterio+"'");
    this.calificacionesHechas[indice].rate=calificado;
    console.log(JSON.stringify(this.calificacionesHechas, null, 2));
    //this.calificacionesArray[indice]=calificado
    //alert(this.calificacionesArray);
  }
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    event.returnValue = true; 
    return '¿Está seguro de abandonar la página? Los datos no guardados se perderán.';
  }

  confirmExit() {
    return '¿Está seguro de abandonar la página? Los datos no guardados se perderán.';
  }
  
}
