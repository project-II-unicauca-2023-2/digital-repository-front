import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mostrar-descargar',
  templateUrl: './mostrar-descargar.component.html',
  styleUrls: ['./mostrar-descargar.component.css']
})
export class MostrarDescargarComponent implements OnInit{
  numContrato:string="";
  constructor( private ruta:ActivatedRoute){

  }
  ngOnInit(): void {
    this.numContrato=this.ruta.snapshot.params['contrato'];
    alert(this.numContrato)
  }

}
