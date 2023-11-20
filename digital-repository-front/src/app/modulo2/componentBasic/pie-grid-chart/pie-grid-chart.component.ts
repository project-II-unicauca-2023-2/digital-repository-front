import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { AppColors } from 'src/colors.config';

@Component({
  selector: 'app-pie-grid-chart',
  templateUrl: './pie-grid-chart.component.html',
  styleUrls: ['./pie-grid-chart.component.css']
})
export class PieGridChartComponent {
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
 
  colorScheme2: Color = {
    name: 'esquemaPersonalizado',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#000066', '#9D0311', '#1D72D3', '#1D72D3', '#1D72D3', '#555555']
  };
  
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
