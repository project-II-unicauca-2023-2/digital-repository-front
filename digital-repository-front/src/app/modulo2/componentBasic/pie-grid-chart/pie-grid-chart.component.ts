import { Component, Input, SimpleChanges } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
/**
 * repositorio https://github.com/swimlane/ngx-charts/blob/master/projects/swimlane/ngx-charts/src/lib/common/base-chart.component.ts
 *opciones:   
 * ejemplo: https://stackblitz.com/edit/swimlane-pie-chart-advanced?embed=1&file=app/app.component.ts
 * */
 export interface datosGrafico {
  name : string;
  value : number;
}
@Component({
  selector: 'app-pie-grid-chart',
  templateUrl: './pie-grid-chart.component.html',
  styleUrls: ['./pie-grid-chart.component.css']
})
export class PieGridChartComponent {
  @Input() datosGraficos!: datosGrafico[];
  view: [number, number] = [1000, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
 
  colorScheme2: Color = {
    name: 'esquemaPersonalizado',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#000066', '#9D0311', '#1D72D3', '#1D72D3', '#1D72D3', '#555555']
  };
  
  constructor() {
    //Object.assign(this, { single });
  }
 /**
   * el metodo se queda escuchndo por si hay cambios poder actulizaar el grafico
   * @param changes captura cambios
   */
 ngOnChanges(changes: SimpleChanges) {
  if (changes['datosGraficos'] && changes['datosGraficos'].currentValue) {
    console.log('RECIBIENDO DATOS', this.datosGraficos);
  }
}
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
