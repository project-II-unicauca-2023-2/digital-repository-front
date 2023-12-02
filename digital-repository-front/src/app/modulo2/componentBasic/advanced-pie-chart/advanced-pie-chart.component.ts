import { Component, HostListener, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Color, DataItem, ScaleType } from '@swimlane/ngx-charts';
//import { datosGrafico } from '../../models/datosGrafico';
import { CriptoService } from '../../services/cripto/cripto.service';

/**
 * repositorio https://github.com/swimlane/ngx-charts/blob/master/projects/swimlane/ngx-charts/src/lib/common/base-chart.component.ts
 *opciones:   
 * ejemplo: https://stackblitz.com/edit/swimlane-pie-chart-advanced?embed=1&file=app/app.component.ts
 * */


interface dicCriteria {
  dicPuntaje: { [key: number]: string };
}
@Component({
  selector: 'app-advanced-pie-chart',
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.css']
})
export class AdvancedPieChartComponent {
  @Input() datosGraficos!: DataItem[];//es un array con name (etiqueta del grafico) value(la cantidad graficada)
  @Input() coloresGraficos!: string[];// arreglo con cadenas  de colores hexadecimales

 
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
  
  constructor(private ruta: Router, private encriptacion:CriptoService) {
    //Object.assign(this, { single });
  }
  /**
   * el metodo se queda escuchndo por si hay cambios poder actulizaar el grafico
   * @param changes captura cambios
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['datosGraficos'] && changes['datosGraficos'].currentValue) {
      //console.log('RECIBIENDO DATOS', this.datosGraficos);
    }
    if (changes['coloresGraficos'] && changes['coloresGraficos'].currentValue) {
      //console.log('RECIBIENDO DATOS', this.coloresGraficos);
      this.colorScheme2 = {
        name: 'esquemaPersonalizado',
        selectable: true,
        group: ScaleType.Linear,
        domain: this.coloresGraficos
      };
    }
  }
  onSelect(data:DataItem): void {
    // Encuentra el índice donde 'name' sea igual a "estado1"
    //const indiceEstado1 = this.datosGraficos.findIndex((dato) => dato.name === "estado1");


    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    // Codificar los valores antes de navegar
    //const valoresCodificados = this.identidades.map(valor => btoa(valor));
    const valoresCodificados = this.encriptacion.encryptArray(data.extra,"unicauca#1927");
    this.ruta.navigate(['/homePage/listadoContratistas'], { queryParams: { iD: valoresCodificados } });
    //this.ruta.navigate(['/homePage/listadoContratistas']);
  }

  onActivate(data:DataItem): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:DataItem): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  hola(){
alert("sfa");
  }
}
