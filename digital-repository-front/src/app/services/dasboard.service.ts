import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { datosDashBoardPrincipal } from '../modulo2/models/datosDashBoardPrincipal';
import { ContractService } from './contract.service';
interface interfaceContrato { /**se pone como interfaz para poder recibir se planea eliminar cuando el back lo retorne con el nombre de vatiables ya establecidas  */
  idContrato: number;
  mask: string;
  year: number;
}
@Injectable({
  providedIn: 'root'
})
export class DasboardService {
  private urlAPI = 'http://localhost:8081/api/dashBoard';

  constructor(
    private httpClient: HttpClient,
    private servicioContrato:ContractService
    ) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),

  };
 
getSubCategoriasBienes(): Observable<string[]> {
  return this.servicioContrato.getSubCategoriasBienes();
    //return ["Compraventa","Suministro","Órdenes de Compra"];
  }
  getSubCategoriasServicios(): Observable<string[]>{
    return this.servicioContrato.getSubCategoriasServicios();
    //return ["Prestación de servicios3333","Consultoría","Suministro","Arrendamiento","Pasantía","Judicatura","Aprendizaje"];
  }
  getSubCategoriasObras(): Observable<string[]>{
    return this.servicioContrato.getSubCategoriasObras();
    //return ["Obra"];
  }
  getPromedioBienes(anio:string): Observable<number>{
    return this.servicioContrato.getPromedioBienes(anio);
    //return this.formatoCortoDecimal(3.53423412343414) ;
  }
  gePromedioServicios(anio:string): Observable<number>{
    return this.servicioContrato.gePromedioServicios(anio);
    //return this.formatoCortoDecimal(4.54234134123412341234);
  }
  getPromediosObras(anio:string): Observable<number>{
    return this.servicioContrato.getPromediosObras(anio);
    //return this.servicioContrato.getSubCategoriasObras();
  }
  /**
   * se desiste del metodo _getPromediosTotalespor problemas de asincronia si se pone aca
   * @returns 
   */
  _getPromediosTotales():number{
    return 0;
    //return this.formatoCortoDecimal((this.gePromedioServicios()+this.getPromedioBienes()+this.getPromediosObras())/3);
  }
  getDatosServicios2(anio:string): Observable<datosDashBoardPrincipal[]>{
   
    return  this.httpClient.get<any>(this.urlAPI + "/Servicios/" +anio).pipe(
      map((response: any)=> {
       
        if (response && response.data && response.data.datosDashBoardPrincipal) {
          // Acceder a 'averageContract' dentro del primer elemento del arreglo 'data'
          return  response.data.datosDashBoardPrincipal as datosDashBoardPrincipal[];
        } else {
          // Manejar el caso en el que la estructura de la respuesta no sea la esperada
          throw new Error('-La estructura de la respuesta no es la esperadaaa datos servicios');
        }
      }),
      catchError((error) => {
        console.error('Error buscando datos servicios', error);
        return throwError(error);
      })
    );
  }
  getDatosObras2(anio:string): Observable<datosDashBoardPrincipal[]>{
   
    return  this.httpClient.get<any>(this.urlAPI + "/Obras/" +anio).pipe(
      map((response: any)=> {
       
        if (response && response.data && response.data.datosDashBoardPrincipal) {
          // Acceder a 'averageContract' dentro del primer elemento del arreglo 'data'
          return  response.data.datosDashBoardPrincipal as datosDashBoardPrincipal[];
        } else {
          // Manejar el caso en el que la estructura de la respuesta no sea la esperada
          throw new Error('-La estructura de la respuesta no es la esperada en grt datos Obras');
        }
      }),
      catchError((error) => {
        console.error('Error en gry datos obras', error);
        return throwError(error);
      })
    );
  }
  getDatosBienes2(anio:string): Observable<datosDashBoardPrincipal[]>{
   
    return  this.httpClient.get<any>(this.urlAPI + "/Bienes/" +anio).pipe(
      map((response: any)=> {
       
        if (response && response.data && response.data.datosDashBoardPrincipal) {
          // Acceder a 'averageContract' dentro del primer elemento del arreglo 'data'
          return  response.data.datosDashBoardPrincipal as datosDashBoardPrincipal[];
        } else {
          // Manejar el caso en el que la estructura de la respuesta no sea la esperada
          throw new Error('-La estructura de la respuesta no es la esperada en grt datos bienes');
        }
      }),
      catchError((error) => {
        console.error('Error en get datos bienes', error);
        return throwError(error);
      })
    );
  }
 /* getDatosServicios():datosDashBoardPrincipal[]{
    const datos:datosDashBoardPrincipal[]=[
      {
        nombreSubCatContrato:"Prestación de servicios",
        rangoScore:"SuperaEspectativas[5]",
        score:5,
        cantidad:22,
        idContratos:["a1","a2"]
      },
      {
        nombreSubCatContrato:"Prestación de servicios",
        rangoScore: "Plenante[4,4.9]",
        score:4,
        cantidad:34,
        idContratos:["s1","s2"]
      }, 
      {
        nombreSubCatContrato:"Prestación de servicios",
        rangoScore:"Parcialmente[3,3.9]",
        score:3,
        cantidad:12,
        idContratos:["d1","d2"]
      },{
        nombreSubCatContrato:"Prestación de servicios",
        rangoScore: "Minimamente[2,2.9]",
        score:2,
        cantidad:22,
        idContratos:["f1","f2"]
      },
      {
        nombreSubCatContrato:"Prestación de servicios",
        rangoScore:"No Cumple[1,1.9]",
        score:1,
        cantidad:34,
        idContratos:["g1","g2"]
      }, 
      {
        nombreSubCatContrato:"Prestación de servicios",
        rangoScore:"NoCalificado",
        score:0,
        cantidad:66,
        idContratos:["h1","h2"]
      },
      {
        nombreSubCatContrato: "Aprendizaje",
        rangoScore:"SuperaEspectativas[5]",
        score:5,
        cantidad: 34,
        idContratos: ["j1", "j2"]
      },
      {
        nombreSubCatContrato: "Aprendizaje",
        rangoScore:"Plenante[4,4.9]",
        score:4,
        cantidad: 56,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Aprendizaje",
        rangoScore: "Parcialmente[3,3.9]",
        score:3,
        cantidad: 67,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Aprendizaje",
        rangoScore:"Minimamente[2,2.9]",
        score:2,
        cantidad: 55,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Aprendizaje",
        rangoScore:"No Cumple[1,1.9]",
        score:1,
        cantidad: 87,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Aprendizaje",
        rangoScore: "NoCalificado",
        score:0,
        cantidad: 14,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Judicatura",
        rangoScore:"SuperaEspectativas[5]",
        score:5,
        cantidad: 18,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Judicatura",
        rangoScore:  "Plenante[4,4.9]",
        score:4,
        cantidad: 31,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Judicatura",
        rangoScore: "Parcialmente[3,3.9]",
        score:3,
        cantidad: 18,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Judicatura",
        rangoScore:  "Minimamente[2,2.9]",
        score:2,
        cantidad: 56,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Judicatura",
        rangoScore: "No Cumple[1,1.9]",
        score:1,
        cantidad: 89,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Judicatura",
        rangoScore: "NoCalificado",
        score:0,
        cantidad: 99,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Pasantía",
        rangoScore: "SuperaEspectativas[5]",
        score:5,
        cantidad: 12,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Pasantía",
        rangoScore: "Plenante[4,4.9]",
        score:4,
        cantidad: 18,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Pasantía",
        rangoScore: "Parcialmente[3,3.9]",
        score:3,
        cantidad: 12,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Pasantía",
        rangoScore: "Minimamente[2,2.9]",
        score:2,
        cantidad: 56,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Pasantía",
        rangoScore: "No Cumple[1,1.9]",
        score:1,
        cantidad: 12,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Pasantía",
        rangoScore: "NoCalificado",
        score:0,
        cantidad: 26,
        idContratos: ["1", "2"]
      }, {
        nombreSubCatContrato: "Arrendamiento",
        rangoScore: "SuperaEspectativas[5]",
        score:5,
        cantidad: 18,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Arrendamiento",
        rangoScore: "Plenante[4,4.9]",
        score:4,
        cantidad: 9,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Arrendamiento",
        rangoScore: "Parcialmente[3,3.9]",
        score:3,
        cantidad: 76,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Arrendamiento",
        rangoScore: "Minimamente[2,2.9]",
        score:2,
        cantidad: 23,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Arrendamiento",
        rangoScore: "No Cumple[1,1.9]",
        score:1,
        cantidad: 87,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Arrendamiento",
        rangoScore: "NoCalificado",
        score:0,
        cantidad: 67,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Suministro",
        rangoScore: "SuperaEspectativas[5]",
        score:5,
        cantidad: 8,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Suministro",
        rangoScore: "Plenante[4,4.9]",
        score:4,
        cantidad: 45,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Suministro",
        rangoScore: "Parcialmente[3,3.9]",
        score:3,
        cantidad: 75,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Suministro",
        rangoScore: "Minimamente[2,2.9]",
        score:2,
        cantidad: 86,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Suministro",
        rangoScore: "No Cumple[1,1.9]",
        score:1,
        cantidad: 23,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Suministro",
        rangoScore: "NoCalificado",
        score:0,
        cantidad: 52,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Consultoría",
        rangoScore: "SuperaEspectativas[5]",
        score:5,
        cantidad: 76,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Consultoría",
        rangoScore: "Plenante[4,4.9]",
        score:4,
        cantidad: 45,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Consultoría",
        rangoScore:"Parcialmente[3,3.9]",
        score:3,
        cantidad: 11,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Consultoría",
        rangoScore: "Minimamente[2,2.9]",
        score:2,
        cantidad: 88,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Consultoría",
        rangoScore: "No Cumple[1,1.9]",
        score:1,
        cantidad: 35,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Consultoría",
        rangoScore: "NoCalificado",
        score:0,
        cantidad: 88,
        idContratos: ["1", "2"]
      }
    ];
    return datos;
  }
  getDatosObras():datosDashBoardPrincipal[]{
    const datos:datosDashBoardPrincipal[] = [
      {
        nombreSubCatContrato: "Obra",
        rangoScore: "SuperaEspectativas[5]",
        score:5,
        cantidad: 22,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Obra",
        rangoScore: "Plenante[4,4.9]",
        score:4,
        cantidad: 34,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Obra",
        rangoScore: "Parcialmente[3,3.9]",
        score:3,
        cantidad: 12,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Obra",
        rangoScore: "Minimamente[2,2.9]",
        score:2,
        cantidad: 22,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Obra",
        rangoScore: "No Cumple[1,1.9]",
        score:1,
        cantidad: 34,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Obra",
        rangoScore: "NoCalificado",
        score:0,
        cantidad: 66,
        idContratos: ["1", "2"]
      }
    ];
  
    return datos;
  }
  getDatosBienes():datosDashBoardPrincipal[]{
    const datos:datosDashBoardPrincipal[]= [
      {
        nombreSubCatContrato: "Órdenes de Compra",
        rangoScore: "SuperaEspectativas[5]",
        score:5,
        cantidad: 22,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Órdenes de Compra",
        rangoScore:  "Plenante[4,4.9]",
        score:4,
        cantidad: 34,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Órdenes de Compra",
        rangoScore: "Parcialmente[3,3.9]",
        score:3,
        cantidad: 12,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Órdenes de Compra",
        rangoScore:  "Minimamente[2,2.9]",
        score:2,
        cantidad: 22,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Órdenes de Compra",
        rangoScore: "No Cumple[1,1.9]",
        score:1,
        cantidad: 34,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Órdenes de Compra",
        rangoScore: "NoCalificado",
        score:0,
        cantidad: 66,
        idContratos: ["1", "2"]
      },{
        nombreSubCatContrato: "Suministro",
        rangoScore: "SuperaEspectativas[5]",
        score:5,
        cantidad: 22,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Suministro",
        rangoScore:  "Plenante[4,4.9]",
        score:4,
        cantidad: 34,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Suministro",
        rangoScore: "Parcialmente[3,3.9]",
        score:3,
        cantidad: 12,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Suministro",
        rangoScore:  "Minimamente[2,2.9]",
        score:2,
        cantidad: 22,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Suministro",
        rangoScore: "No Cumple[1,1.9]",
        score:1,
        cantidad: 34,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Suministro",
        rangoScore: "NoCalificado",
        score:0,
        cantidad: 44,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Compraventa",
        rangoScore: "SuperaEspectativas[5]",
        score:5,
        cantidad: 22,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Compraventa",
        rangoScore: "Plenante[4,4.9]",
        score:4,
        cantidad: 34,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Compraventa",
        rangoScore: "Parcialmente[3,3.9]",
        score:3,
        cantidad: 12,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Compraventa",
        rangoScore:  "Minimamente[2,2.9]",
        score:2,
        cantidad: 22,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Compraventa",
        rangoScore: "No Cumple[1,1.9]",
        score:1,
        cantidad: 34,
        idContratos: ["1", "2"]
      },
      {
        nombreSubCatContrato: "Compraventa",
        rangoScore: "NoCalificado",
        score:0,
        cantidad: 23,
        idContratos: ["1", "2"]
      }
    ];
  
    return datos;
  }
  getDatosTodos():datosDashBoardPrincipal[]{
    const listaUnida=[...this.getDatosBienes(),...this.getDatosObras(),...this.getDatosServicios()];
    return listaUnida;

  }*/
  formatoCortoDecimal(numero:number):number{
    return parseFloat(numero.toPrecision(2));
  }

  /**
   * 
   * @param idContratos lista ids de contratos
   * @returns  la mascara y el año del contrato
   */
  getContratosPorIds(idContratos:string[]): Observable<interfaceContrato[]>{
    const body = JSON.stringify(idContratos);
    return this.httpClient.post(this.urlAPI + "/aboutContracts",body,this.httpHeader).pipe(
      map((response:any)=> response.data),
      catchError(e=>{
        console.log('error en el servicio contrato get getContratosPorIds','error');
        return throwError(e);
      })
    )
  }
}
