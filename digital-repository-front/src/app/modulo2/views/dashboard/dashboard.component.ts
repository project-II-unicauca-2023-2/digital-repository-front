import { Component, OnInit } from '@angular/core';

import { DasboardService } from 'src/app/services/dasboard.service';
import { AdvancedPieChartComponent } from '../../componentBasic/advanced-pie-chart/advanced-pie-chart.component';
import { PieGridChartComponent } from '../../componentBasic/pie-grid-chart/pie-grid-chart.component';
import { VerticalBarChartComponent } from '../../componentBasic/vertical-bar-chart/vertical-bar-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  subcategorisContrato:string[]=[];
  promedioCategoriaContrato:number=0;
  val1:number=1;/**valor filtro rango inferior */
  val2:number=5;/** valor filtro rango superior*/
  coloresGraficos=['#9D0311','#45006D',  '#000066', '#1D72D3', '#6AB3E9', '#555555'];
  datosGraficos=[
    {
      "name": "Supera Espectativas[5]",
      "value": 9200000
      },
      {
        "name": "Plenamente[4,4.9]",
        "value": 3200000
      },
      {
        "name": "Parcialmente[3,3.9]",
        "value": 7200000
      },
    {
      "name": "Minimamente[2,2.9]",
      "value": 4000000
    },
   
    {
      "name": "No Cumple[1,1.9]",
      "value": 1000000
    },
    
  
  {
  "name": "SIN CALIFICAR",
  "value": 6200000
  }
  ];
  mostrarTodas: boolean = false;
  constructor(private dashboardService: DasboardService){

    this.categoriaBusqueda="todas"
  }
  ngOnInit(): void {
    this.promedioCategoriaContrato=this.dashboardService.getPromediosTotales();
  }
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
    //alert("se selecciona anio"+anio);
    this.anioBusqueda=anio;
  }
  categoriaBusqueda:string="";
  recibidoCategoria(categoriaBusqueda: string){
    //alert("se selecciona categoria:"+categoriaBusqueda);
    this.categoriaBusqueda=categoriaBusqueda.toLowerCase(); //actualiza la variable mandada al aside y al promedio
    switch (this.categoriaBusqueda) {
      case 'obras':
        this.subcategorisContrato=this.dashboardService.getSubCategoriasObras();
        this.promedioCategoriaContrato=this.dashboardService.getPromediosObras();
        break;
    
      case 'bienes':
        this.subcategorisContrato=this.dashboardService.getSubCategoriasBienes();
        this.promedioCategoriaContrato=this.dashboardService.getPromedioBienes();
        break;
    
      case 'servicios':
        this.subcategorisContrato=this.dashboardService.getSubCategoriasServicios();
        this.promedioCategoriaContrato=this.dashboardService.gePromedioServicios();
        break;
    
      case 'todas':
        this.subcategorisContrato=[];
        this.promedioCategoriaContrato=this.dashboardService.getPromediosTotales();
        
      break;
      default:
        console.log('Opción no reconocida en la seleccion [obras,servicios,bienes]');
    }


  }
  recibidoSubCategoria:string[]=this.subcategorisContrato;
  recibidoSubCategorias(subC:string[]){
    this.recibidoSubCategoria=subC;
    console.log(this.recibidoSubCategoria);
  }



 
}
