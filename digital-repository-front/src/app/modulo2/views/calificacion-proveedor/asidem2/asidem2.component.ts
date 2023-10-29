import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';


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
  fechaInicio: Date;
  fechaFin: Date;

  constructor() {

    this.numContrato = '';
    this.nombreContratista = '';
    this.nitContratista = '';
    this.cedulaContratista = '';
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
   }

  ngOnInit() {
    this.nombreContratista='JORGE MEJÍA ARIAS';
    this.nitContratista= '0000000000';
    this.cedulaContratista= '1061781100';
    this.fechaInicio = new Date('2023-06-14');
    this.fechaFin = new Date('2023-07-13');
  }
}
