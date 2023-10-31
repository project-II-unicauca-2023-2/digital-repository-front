import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { datosAside } from 'src/app/modulo2/models/datosAside';
import { ContractService } from 'src/app/services/contract.service';


@Component({
  selector: 'app-asidem2',
  templateUrl: './asidem2.component.html',
  styleUrls: ['./asidem2.component.css'],
  providers: [DatePipe] // Agrega DatePipe a la lista de proveedores
})
export class Asidem2Component implements OnInit {

  @Input() numContrato: string;
  nombreContratista : string;
  nitContratista : string;
  cedulaContratista : string;
  fechaInicio!: Date | null;
  fechaFin!: Date | null;
  datosAsideEncontrados!: datosAside;
  constructor( private servicioContrato:ContractService) {

    this.numContrato = '';
    this.nombreContratista = '';
    this.nitContratista = '';
    this.cedulaContratista = '';
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
   }

  ngOnInit() {
    this.servicioContrato.getDatosAside(this.numContrato).subscribe((datos: datosAside) => {//consulta a la bse de datos para saber si el contraro no tiene aun evluacion
  
      this.nombreContratista=datos.name;
      this.nitContratista= datos.identification;
      this.cedulaContratista= datos.identification;
      this.fechaInicio = datos.initialDate;
      this.fechaFin =datos.finalDate;
      
    });
  }
}
