import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { AppColors } from 'src/colors.config';
@Component({
  selector: 'app-grafico-torta-abanzado',
  templateUrl: './grafico-torta-abanzado.component.html',
  styleUrls: ['./grafico-torta-abanzado.component.css']
})
/**
 * repositorio https://github.com/swimlane/ngx-charts/blob/master/projects/swimlane/ngx-charts/src/lib/common/base-chart.component.ts
 *opciones: https://swimlane.github.io/ngx-charts/#/ngx-charts/advanced-pie-chart
 * ejemplo: https://stackblitz.com/edit/swimlane-pie-chart-advanced?embed=1&file=app/app.component.ts
 * */
export class GraficoTortaAbanzadoComponent {
  single=[
    {
      "name": "No Cumple[1,1.5]",
      "value": 1000000
    },
    {
      "name": "Minimamente[1.5,2.5)",
      "value": 4000000
    },
    {
      "name": "Parcialmente[2.5,3.5)",
      "value": 7200000
    },
    {
    "name": "Plenamente[3.5,4.5)",
    "value": 3200000
  },
  {
  "name": "Supera Espectativas[4.5,5]",
  "value": 9200000
  },
  {
  "name": "SIN CALIFICAR",
  "value": 6200000
  }
  ];
  view: [number, number] = [1000, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
 
  colorScheme2: Color = { name: 'color1', selectable: true, group: ScaleType.Linear, // No es necesario el casting a ScaleType
   domain: [AppColors.color1, AppColors.color2, AppColors.color3, AppColors.color4,AppColors.color5, '#555555'] };
  ;
  constructor() {
    //Object.assign(this, { single });
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
