import { Component, OnInit } from '@angular/core';

import { DasboardService } from 'src/app/services/dasboard.service';
import { AdvancedPieChartComponent } from '../../componentBasic/advanced-pie-chart/advanced-pie-chart.component';
import { PieGridChartComponent } from '../../componentBasic/pie-grid-chart/pie-grid-chart.component';
import { VerticalBarChartComponent } from '../../componentBasic/vertical-bar-chart/vertical-bar-chart.component';
import { datosDashBoardPrincipal } from '../../models/datosDashBoardPrincipal';
import { datosGrafico } from '../../models/datosGrafico';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  subcategorisContrato:string[]=[];
  promedioCategoriaContrato:number=0;
  val1:number=0;/**valor filtro rango inferior */
  val2:number=5;/** valor filtro rango superior*/
  coloresGraficos=['#9D0311','#45006D',  '#000066', '#1D72D3', '#6AB3E9', '#555555'];
  coloresEnviar:string[];
  datosGraficar!:datosGrafico[];
  datosGraficos=[
    {
      "name": "SuperaEspectativas[5]",
      "value": 9200000
      },
      {
        "name": "Plenante[4,4.9]",
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
    this.coloresEnviar=this.coloresGraficos;
  }
  ngOnInit(): void {
    this.promedioCategoriaContrato=this.dashboardService.getPromediosTotales();
    this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosTodos());
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
    //alert("s");
    this.categoriaBusqueda=categoriaBusqueda.toLowerCase(); //actualiza la variable mandada al aside y al promedio
    switch (this.categoriaBusqueda) {
      case 'obras':
        this.subcategorisContrato=this.dashboardService.getSubCategoriasObras();
        this.promedioCategoriaContrato=this.dashboardService.getPromediosObras();
        this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosObras());
        break;
    
      case 'bienes':
        this.subcategorisContrato=this.dashboardService.getSubCategoriasBienes();
        this.promedioCategoriaContrato=this.dashboardService.getPromedioBienes();
        this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosBienes());
        break;
    
      case 'servicios':
        this.subcategorisContrato=this.dashboardService.getSubCategoriasServicios();
        this.promedioCategoriaContrato=this.dashboardService.gePromedioServicios();
        this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosServicios());
        break;
    
      case 'todas':
        this.subcategorisContrato=[];
        this.promedioCategoriaContrato=this.dashboardService.getPromediosTotales();
        this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosTodos());
      break;
      default:
        console.log('Opción no reconocida en la seleccion [obras,servicios,bienes]');
    }

  }
  hola="te sakudi";
  /**
   * al cambiar los datosGraficar se refresca la grafica por que obtiene nuevos datos
   */
  refrescoGrafica(){
    let indicePrimerColor=this.coloresGraficos.length-this.val2;//cuando necesitamos el color para el valor mas alto esta en la posicion cero 
    let indiceUltimoColor=this.coloresGraficos.length-this.val1;//cuando necesitamos el color para el valor mas vajo es contado desde la ultima posicion
    this.coloresEnviar=this.coloresGraficos.slice(indicePrimerColor-1, indiceUltimoColor+ 1);
    switch (this.categoriaBusqueda) {
      case 'obras':
        this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosObras());
        break;
    
      case 'bienes':
        this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosBienes());
        break;
    
      case 'servicios':
        this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosServicios());
        break;
    
      case 'todas':
        this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosTodos());
      break;
      default:
        console.log('Opción no reconocida en la seleccion [obras,servicios,bienes]');
    }
  }
  recibidoSubCategoria:string[]=this.subcategorisContrato;
  recibidoSubCategorias(subC:string[]){
    this.recibidoSubCategoria=subC;
    console.log(this.recibidoSubCategoria);
    this.refrescoGrafica();
    //this.recibidoCategoria(this.categoriaBusqueda);
  }
/**
 * transforma los datos de la base de datos para que pueda ser leido por las graficas
 * @param datos 
 * @returns 
 */
  transformarDatos(datos: datosDashBoardPrincipal[]): datosGrafico[] {
    const datosTransformados :datosGrafico[]= Array.from(
      new Set( //extraer todos los valores únicos en un conjunto(SET) de rangoscore ya que es lo que se grafica
          
      datos
      .filter((dato) => dato.score >= this.val1 && dato.score <= this.val2) // Filtrar por score
      .map((dato) => dato.rangoScore)
)).map((rangoScore) => ({//iteramos
      name: rangoScore, //asignamos a name el rango score unico
      value: datos //para los value asignamos todos los datos
      .filter((dato) => {
        if (this.categoriaBusqueda === "todas") {
          return dato.rangoScore === rangoScore;
        } else {
          return (
            dato.rangoScore === rangoScore &&
            this.recibidoSubCategoria.includes(dato.nombreSubCatContrato)
          );
        }
      }).reduce((sum, dato) => sum + dato.cantidad, 0), //hacemos operacion de reduccion para obtener un solo numero aplicandole la suma..(sum valor inicial en cero y dato la cantidad)
    }));
    console.log("losDATOS:"+JSON.stringify(datosTransformados));
    return datosTransformados;
  }

 
}
