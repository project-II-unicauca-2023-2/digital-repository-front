import { Component, HostListener, Input, SimpleChanges } from '@angular/core';
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
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css']
})
export class VerticalBarChartComponent {
  @Input() datosGraficos!: datosGrafico[];
  view: [number, number] = [window.innerWidth * 0.6, window.innerHeight * 0.3];
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.view = [event.target.innerWidth * 0.6, event.target.innerHeight * 0.3];
  }

  // Opciones
  gradient: boolean = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categoría';
  showYAxisLabel = true;
  yAxisLabel = 'Valor';

  colorScheme2: Color = {
    name: 'esquemaPersonalizado',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#000066', '#9D0311', '#1D72D3', '#1D72D3', '#1D72D3', '#555555']
  };
  

  constructor() { }

   /**
   * el metodo se queda escuchndo por si hay cambios poder actulizaar el grafico
   * @param changes captura cambios
   */
   ngOnChanges(changes: SimpleChanges) {
    if (changes['datosGraficos'] && changes['datosGraficos'].currentValue) {
      console.log('RECIBIENDO DATOS', this.datosGraficos);
    }
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
