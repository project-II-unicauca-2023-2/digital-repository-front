import { Component, HostListener, OnInit } from '@angular/core';
export interface Tile {
  criterio : string;
  descripcion : string;
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
   calificacionesArray: number[] = [];
   indexVistaActual: number = 0; // por defecto la primera vista se ve 0
   indexVistaMax: number = (this.tiles.length-1) +2; //total de calificaciones(-1 POR SER INDICE)+ 2 vistas mas (busqueda y resultados)
  
   numContrato:string="";
  constructor(){
    this.calificacionesArray = new Array(this.tiles.length).fill(0);
  }
   
  ngOnInit() {
    window.onbeforeunload = () => this.confirmExit();
  }
  /**
   * navega a la proxima pagina y hace un llamado a recupera datos necesarios
   * @param contrato es el identificador del contrato ya balidado por la primera interfaz
   */

  recibidoIdContratoValido(contrato: string) {
    console.log("Contrato recibido: ", contrato);
    this.numContrato=contrato;
    this.indexVistaActual=this.indexVistaActual+1
  }
  recibidoBotonNavegacion(direccionNavegacion: number){
    this.comprobarvista()
    this.indexVistaActual=this.indexVistaActual+direccionNavegacion;
  }
  /**
   * comprueba que sea vista valida
   */
  comprobarvista(){

  }
  /**
   * cuando un criterio es calificado lo llenamos en el arreglo
   */
  ingresarCalificacionCriterio(calificado:number, indice:number){
    console.log("caificacionResivida"+calificado+" para criterio '"+this.tiles[indice].criterio+"'");
    this.calificacionesArray[indice]=calificado
    alert(this.calificacionesArray);
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
