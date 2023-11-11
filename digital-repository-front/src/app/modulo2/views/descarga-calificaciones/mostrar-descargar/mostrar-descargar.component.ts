import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { datosAside } from 'src/app/modulo2/models/datosAside';

@Component({
  selector: 'app-mostrar-descargar',
  templateUrl: './mostrar-descargar.component.html',
  styleUrls: ['./mostrar-descargar.component.css']
})
export class MostrarDescargarComponent implements OnInit{
  numContrato:string="";
  datosContrato!:datosAside;
  constructor( private ruta:ActivatedRoute){

  }
  ngOnInit(): void {
    this.numContrato=this.ruta.snapshot.params['contrato'];
    //alert(this.numContrato)
  }
  recibidoDatosContrato(datosContratoAside: datosAside){
    this.datosContrato=datosContratoAside ;

  }
}
