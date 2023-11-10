import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() emisorDatosContrato = new EventEmitter<datosAside>();

  datosAsideEncontrados!: datosAside;
  constructor( private servicioContrato:ContractService) {

    this.numContrato = '';
   }

  ngOnInit() {
    this.servicioContrato.getDatosAside(this.numContrato).subscribe((datos: datosAside) => {//consulta a la bse de datos para saber si el contraro no tiene aun evluacion

      this.datosAsideEncontrados=datos
      this.emisorDatosContrato.emit(this.datosAsideEncontrados);
    });
  }
}
