import { Component } from '@angular/core';

@Component({
  selector: 'app-linea-calificacion',
  templateUrl: './linea-calificacion.component.html',
  styleUrls: ['./linea-calificacion.component.css']
})
export class LineaCalificacionComponent {
  //single: any[];
  view: [number, number] = [300, 300];
  value: number = 3.9;
  min: number = 1;
  max: number = 5;
  units:string="PromedioCalificacion";
  previousValue: number = 5;

  onSelect(event:any) {
    console.log(event);
  }
}
