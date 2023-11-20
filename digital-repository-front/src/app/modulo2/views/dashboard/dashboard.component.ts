import { Component } from '@angular/core';
import { PieGridChartComponent } from '../../componentBasic/pie-grid-chart/pie-grid-chart.component';
import { VerticalBarChartComponent } from '../../componentBasic/vertical-bar-chart/vertical-bar-chart.component';
import { AdvancedPieChartComponent } from '../../componentBasic/advanced-pie-chart/advanced-pie-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  mostrarTodas: boolean = false;

  mostrarTodasLasGraficas() {
    this.mostrarTodas = !this.mostrarTodas;
  
    // Resetear la selección en la lista desplegable
    if (this.mostrarTodas) {
      this.graficoSeleccionado = 'todas';
    } else {
      this.graficoSeleccionado = '';
    }
  }

  graficos=[
    { id: 'avanzado', nombre: 'Gráfico Avanzado', componente: AdvancedPieChartComponent },
    {id: 'pie-grid', nombre: 'Gráfico de Pie', componente: PieGridChartComponent},
    {id: 'barras', nombre: 'Gráfico de Barras', componente: VerticalBarChartComponent}
  ];

  graficoSeleccionado : string='avanzado' ;

  cambiarGrafico(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.graficoSeleccionado = selectElement.value;

    // Desactivar la visualización de todas las gráficas si se selecciona una específica
    if (this.graficoSeleccionado !== 'todas') {
      this.mostrarTodas = false;
    }

    console.log('Gráfico Seleccionado:', this.graficoSeleccionado);
  }
  

  anioBusqueda:string="";
  recibidoAnio(anio: string){
    this.anioBusqueda=anio;
  }
}
