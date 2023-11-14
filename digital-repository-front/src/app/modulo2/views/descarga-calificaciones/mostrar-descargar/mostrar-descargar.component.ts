import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { datosAside } from 'src/app/modulo2/models/datosAside';
import { idContrato } from 'src/app/modulo2/models/idContrato';

@Component({
  selector: 'app-mostrar-descargar',
  templateUrl: './mostrar-descargar.component.html',
  styleUrls: ['./mostrar-descargar.component.css']
})
export class MostrarDescargarComponent implements OnInit {
  numContrato: idContrato = { mascara: '', anio: '' };
  datosContrato!: datosAside;

  constructor(private ruta: ActivatedRoute) {}

  ngOnInit(): void {
    this.numContrato.mascara = this.ruta.snapshot.params['contrato'];
    this.numContrato.anio = this.ruta.snapshot.params['anio'];
    //alert(JSON.stringify(this.numContrato));
  }

  recibidoDatosContrato(datosContratoAside: datosAside) {
    this.datosContrato = datosContratoAside;
  }
}
