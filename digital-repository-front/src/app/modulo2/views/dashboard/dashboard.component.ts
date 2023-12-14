import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataItem } from '@swimlane/ngx-charts';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DasboardService } from 'src/app/services/dasboard.service';
import { AdvancedPieChartComponent } from '../../componentBasic/advanced-pie-chart/advanced-pie-chart.component';
import { PieGridChartComponent } from '../../componentBasic/pie-grid-chart/pie-grid-chart.component';
import { VerticalBarChartComponent } from '../../componentBasic/vertical-bar-chart/vertical-bar-chart.component';
import { datosDashBoardPrincipal } from '../../models/datosDashBoardPrincipal';
import { CriptoService } from '../../services/cripto/cripto.service';
//import { datosGrafico } from '../../models/datosGrafico';

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
  idGraficados=[];/**es necesario para cuando se quiera pasar a la interfaz mas espesifica pero dando click a la etiqueta de el filtro  */
  coloresGraficos=['#9D0311','#45006D',  '#000066', '#1D72D3', '#6AB3E9', '#555555'];
  coloresEnviar:string[];
  datosGraficar!:DataItem[];
  
  mostrarTodas: boolean = false;
  constructor(private dashboardService: DasboardService, private ruta: Router, private encriptacion:CriptoService){

    this.categoriaBusqueda="todas"
    this.coloresEnviar=this.coloresGraficos;
  }
  ngOnInit(): void {
    this.anioBusqueda= new Date().getFullYear()+"";
    let sumatoriaProm=0;
    this.obtenerPromediosYCalcularPromedioTotal();
    //this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosTodos());
    this.obtenerTodosLosDatos();
  }
  
  async obtenerPromediosYCalcularPromedioTotal() {
    try {
      const [promedioObras, promedioBienes, promedioServicios]: any = await forkJoin(
        this.dashboardService.getPromediosObras(this.anioBusqueda),
        this.dashboardService.getPromedioBienes(this.anioBusqueda),
        this.dashboardService.gePromedioServicios(this.anioBusqueda)
      )
        .pipe(
          catchError((error) => {
            console.error('Error al obtener promedios:', error);
            return of(undefined);
          })
        )
        .toPromise();

      console.log('Respuestas de promedios:', promedioObras, promedioBienes, promedioServicios);

      if (promedioObras !== undefined && promedioBienes !== undefined && promedioServicios !== undefined) {
        const cantidadPromediosNoCero = [promedioObras, promedioBienes, promedioServicios].filter(promedio => promedio !== 0).length;
        const sumatoriaProm = promedioObras + promedioBienes + promedioServicios;
        this.promedioCategoriaContrato = sumatoriaProm / cantidadPromediosNoCero;
      } else {
        console.error('Al menos una de las solicitudes de promedio devolvió undefined.');
      }
    } catch (error) {
      console.error('Ocurrió un error al obtener promedios y calcular el promedio total:', error);
    }
  }
  async obtenerTodosLosDatos() {
    try {
      const [promedioObras, promedioBienes, promedioServicios]: any = await forkJoin(
        this.dashboardService.getDatosObras2(this.anioBusqueda),
        this.dashboardService.getDatosBienes2(this.anioBusqueda),
        this.dashboardService.getDatosServicios2(this.anioBusqueda)
      )
        .pipe(
          catchError((error) => {
            console.error('Error al obtener promedios:', error);
            return of(undefined);
          })
        )
        .toPromise();

      const todos=[...promedioObras,...promedioBienes,...promedioServicios];
      console.log('Respuestas de todos Unidos:',todos);

      if (promedioObras !== undefined && promedioBienes !== undefined && promedioServicios !== undefined) {
        this.datosGraficar=this.transformarDatos(todos);
      } else {
        console.error('Al menos una de las solicitudes de promedio devolvió undefined.');
      }
    } catch (error) {
      console.error('Ocurrió un error al obtener promedios y calcular el promedio total:', error);
    }
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

    //console.log('Gráfico Seleccionado:', this.graficoSeleccionado);
  }
  redirigirListado(){
    const valoresCodificados = this.encriptacion.encryptArray(this.idGraficados,"unicauca#1927");
    this.ruta.navigate(['/homePage/listadoContratistas'], { queryParams: { iD: valoresCodificados, anio:this.anioBusqueda } });

  }

  anioBusqueda:string="";
  recibidoAnio(anio: string){
    //alert("se selecciona anio"+anio);
    this.anioBusqueda=anio;
    this.categoriaBusqueda="todas";
    this.obtenerPromediosYCalcularPromedioTotal();
    this.refrescoGrafica();
    this.obtenerTodosLosDatos();
  }
  categoriaBusqueda:string="";

  recibidoCategoria(categoriaBusqueda: string){
    this.promedioCategoriaContrato=0;
    
    //alert("se selecciona categoria:"+categoriaBusqueda);
    //alert("s");
    let datosCat:datosDashBoardPrincipal[];
    this.categoriaBusqueda=categoriaBusqueda.toLowerCase(); //actualiza la variable mandada al aside y al promedio
    switch (this.categoriaBusqueda) {
      case 'obras':
        this.dashboardService.getSubCategoriasObras().subscribe(
          (data: string[]) => {
            //console.log("habeis recuperado" + JSON.stringify(data));/           
            this.subcategorisContrato= data;
          },
          (error) => {
            // Manejo de errores
            this.promedioCategoriaContrato = 0; 
            console.error('Ocurrió un error al obtener los criterios:', error);
          }
        );
        //this.subcategorisContrato=this.dashboardService.getSubCategoriasObras();
        this.dashboardService.getPromediosObras(this.anioBusqueda).subscribe(
          (data: number) => {
            //console.log("2habeis recuperado" + JSON.stringify(data));            
            this.promedioCategoriaContrato= data;
            //console.log(" 2ahora vale" +  this.promedioCategoriaContrato);  
          },
          (error) => {
            // Manejo de errores
            this.promedioCategoriaContrato = 0; 
            console.error('Ocurrió un error al obtener  promedio de obras:', error);
          }
        );
        //this.promedioCategoriaContrato=this.dashboardService.getPromediosObras();
        break;
    
      case 'bienes':
        this.dashboardService.getSubCategoriasBienes().subscribe(
          (data: string[]) => {
            //console.log("habeis recuperado" + JSON.stringify(data));/            
            this.subcategorisContrato= data;
          },
          (error) => {
            // Manejo de errores
            this.promedioCategoriaContrato = 0; 
            console.error('Ocurrió un error al obtener los criterios:', error);
          }
        );
        //this.subcategorisContrato=this.dashboardService.getSubCategoriasBienes();
        this.dashboardService.getPromedioBienes(this.anioBusqueda).subscribe(
          (data: number) => {
            //console.log("2habeis recuperado" + JSON.stringify(data));            
            this.promedioCategoriaContrato= data;
            //console.log(" 2ahora vale" +  this.promedioCategoriaContrato); 
          },
          (error) => {
            // Manejo de errores
            this.promedioCategoriaContrato = 0; 
            console.error('Ocurrió un error al obtener  promedio de bienes:', error);
          }
        );
        //this.promedioCategoriaContrato=this.dashboardService.getPromedioBienes();
        break;
    
      case 'servicios':
        this.dashboardService.getSubCategoriasServicios().subscribe(
          (data: string[]) => {
            //console.log("habeis recuperado" + JSON.stringify(data));            
            this.subcategorisContrato= data;
          },
          (error) => {
            // Manejo de errores
            this.promedioCategoriaContrato = 0; 
            console.error('Ocurrió un error al obtener los criterios:', error);
          }
        );
        //this.subcategorisContrato=this.dashboardService.getSubCategoriasServicios();
        this.dashboardService.gePromedioServicios(this.anioBusqueda).subscribe(
          (data: number) => {
            this.promedioCategoriaContrato = 0; 
           // console.log("2habeis recuperado" + JSON.stringify(data));            
            this.promedioCategoriaContrato= data;
            //console.log(" 2ahora vale" +  this.promedioCategoriaContrato); 
          },
          (error) => {
            // Manejo de errores
            this.promedioCategoriaContrato = 0; 
            console.error('Ocurrió un error al obtener  promedio de servicios:', error);
          }
        );
        //this.promedioCategoriaContrato=this.dashboardService.gePromedioServicios();
        break;
    
      case 'todas':
        this.obtenerPromediosYCalcularPromedioTotal();
      break;
      default:
        console.log('Opción no reconocida en la seleccion [obras,servicios,bienes]');
    }
    this.refrescoGrafica();
  }

  /**
   * al cambiar los datosGraficar se refresca la grafica por que obtiene nuevos datos
   */
  refrescoGrafica(){
    let indicePrimerColor=this.coloresGraficos.length-this.val2;//cuando necesitamos el color para el valor mas alto esta en la posicion cero 
    let indiceUltimoColor=this.coloresGraficos.length-this.val1;//cuando necesitamos el color para el valor mas vajo es contado desde la ultima posicion
    this.coloresEnviar=this.coloresGraficos.slice(indicePrimerColor-1, indiceUltimoColor+ 1);
    switch (this.categoriaBusqueda) {
      case 'obras':
        this.dashboardService.getDatosObras2(this.anioBusqueda).subscribe(
          (data: datosDashBoardPrincipal[]) => {
            console.log("DATOS PRINCIPALES" +JSON.stringify(data));
            this.datosGraficar=this.transformarDatos(data);
          },
          (error) => {
            // Manejo de errores
            console.error('Ocurrió un error al obtener  promedio de servicios:', error);
          }
        );
        //this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosObras());
        break;
    
      case 'bienes':
        this.dashboardService.getDatosBienes2(this.anioBusqueda).subscribe(
          (data: datosDashBoardPrincipal[]) => {
            console.log("DATOS PRINCIPALES" +JSON.stringify(data));
            this.datosGraficar=this.transformarDatos(data);
          },
          (error) => {
            // Manejo de errores
            console.error('Ocurrió un error al obtener  promedio de servicios:', error);
          }
        );
        //this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosBienes());
        break;
    
      case 'servicios':
        this.dashboardService.getDatosServicios2(this.anioBusqueda).subscribe(
          (data: datosDashBoardPrincipal[]) => {
            console.log("DATOS PRINCIPALES" +JSON.stringify(data));
            this.datosGraficar=this.transformarDatos(data);
          },
          (error) => {
            // Manejo de errores
            console.error('Ocurrió un error al obtener  promedio de servicios:', error);
          }
        );
        //console.log("DATOS PRINCIPALES quemados" +JSON.stringify(this.dashboardService.getDatosServicios()));
        //this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosServicios());

        break;
    
      case 'todas':
        this.dashboardService.getDatosObras2(this.anioBusqueda).subscribe(
          (datosObra: datosDashBoardPrincipal[]) => {
            this.dashboardService.getDatosBienes2(this.anioBusqueda).subscribe(
              (datosBien: datosDashBoardPrincipal[]) => {
                this.dashboardService.getDatosServicios2(this.anioBusqueda).subscribe(
                  (dataServicio: datosDashBoardPrincipal[]) => {
                    const todos=[...datosObra,...datosBien,...dataServicio];
                    this.datosGraficar=this.transformarDatos(todos);
                  },
                  (error) => {
                    console.error('Ocurrió un error al obtener  promedio de servicios:', error);
                  }
                );
              },
              (error) => {
                console.error('Ocurrió un error al obtener  promedio de servicios:', error);
              }
            );

          },
          (error) => {
            console.error('Ocurrió un error al obtener  promedio de servicios:', error);
          }
        );
        //this.datosGraficar=this.transformarDatos(this.dashboardService.getDatosTodos());
      break;
      default:
        console.log('Opción no reconocida en la seleccion [obras,servicios,bienes]');
    }
  }
  recibidoSubCategoria:string[]=this.subcategorisContrato;
  recibidoSubCategorias(subC:string[]){
    this.recibidoSubCategoria=subC;
    //console.log(this.recibidoSubCategoria);
    this.refrescoGrafica();
    //this.recibidoCategoria(this.categoriaBusqueda);
  }
/**
 * transforma los datos de la base de datos para que pueda ser leido por las graficas
 * @param datos ingresamos los datos traidos de la bd
 * @returns retormanos un DataItem que es de la libreria que maneja las graficas
 */
  transformarDatos(datos: datosDashBoardPrincipal[]): DataItem[] {
    const datosTransformados :DataItem[]= Array.from(
      new Set( //extraer todos los valores únicos en un conjunto(SET) de rangoscore ya que es lo que se grafica          
        datos
        .filter((dato) => dato.score >= this.val1 && dato.score <= this.val2) // Filtrar por score
        .map((dato) => dato.rangoScore)
        )
      ).map((rangoScore) => (
          {//iteramos
            name: rangoScore, //asignamos a name el rango score unico
              extra:this.getIdContratosPorRangoScore(datos, rangoScore),
              value: datos // cantidad para los value asignamos todos los datos
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
          }
        )
      );
    //console.log("losDATOS transformados son:"+JSON.stringify(datosTransformados));

    this.idGraficados = datosTransformados.reduce((acc, current) => {
      return acc.concat(current.extra);
    }, []);
    
    //console.log( "todos los identificadores en el grafico"+extras);
    return datosTransformados;
  }
  getIdContratosPorRangoScore(datos: datosDashBoardPrincipal[], rangoScore: string): string[] {
    const idContratos: string[] = [];
    datos
      .filter((dato) => dato.rangoScore === rangoScore)
      .forEach((dato) => {
        idContratos.push(...dato.idContratos);
      });
    // Eliminar duplicados si es necesario
    return Array.from(new Set(idContratos));
  }
 
}
