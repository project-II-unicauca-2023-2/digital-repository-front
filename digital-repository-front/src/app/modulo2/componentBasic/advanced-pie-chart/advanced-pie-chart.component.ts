import { Component, HostListener, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
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

interface dicCriteria {
  dicPuntaje: { [key: number]: string };
}
@Component({
  selector: 'app-advanced-pie-chart',
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.css']
})
export class AdvancedPieChartComponent {
  @Input() datosGraficos!: datosGrafico[];
  @Input() coloresGraficos!: string[];
 
  view: [number, number] = [window.innerWidth * 0.6, window.innerHeight * 0.3];
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.view = [event.target.innerWidth * 0.6, event.target.innerHeight * 0.3];
  }
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
 
  colorScheme2: Color = {
    name: 'esquemaPersonalizado',
    selectable: true,
    group: ScaleType.Linear,
    domain: this.coloresGraficos
  };
  
  constructor(private ruta: Router) {
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
    if (changes['coloresGraficos'] && changes['coloresGraficos'].currentValue) {
      console.log('RECIBIENDO DATOS', this.coloresGraficos);
      this.colorScheme2 = {
        name: 'esquemaPersonalizado',
        selectable: true,
        group: ScaleType.Linear,
        domain: this.coloresGraficos
      };
    }
  }
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.ruta.navigate(['/homePage/listadoContratistas']);
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
