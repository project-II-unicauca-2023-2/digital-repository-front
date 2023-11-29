import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-linea-calificacion',
  templateUrl: './linea-calificacion.component.html',
  styleUrls: ['./linea-calificacion.component.css']
})
export class LineaCalificacionComponent {
  //single: any[];
  view: [number, number] = [window.innerWidth * 0.2, window.innerHeight * 0.3];
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.view = [event.target.innerWidth * 0.2, event.target.innerHeight * 0.3];
  }
  value: number = 3.9;
  min: number = 1;
  max: number = 5;
  units:string="PromedioCalificacion";
  previousValue: number = 5;

  onSelect(event:any) {
    console.log(event);
  }
}
