import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Response } from 'src/app/class/response';
import { Contract } from '../class/contract';
import { UpdateContract } from '../class/models/UpdateContract';
import { responseDocument } from '../class/models/responseDocument';
import { datosAside } from '../modulo2/models/datosAside';
import { descriptionCriteriaContract } from '../modulo2/models/descriptionCriteriaContract';
import { idContrato } from '../modulo2/models/idContrato';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private urlAPI = 'http://localhost:8081/api/contract';
  private urlAPIModalityType = 'http://localhost:8081/api/modalityContractType';
  private urlAPIModality = 'http://localhost:8081/api/modality';
  private urlAPIContractType = 'http://localhost:8081/api/contractType';
  private cart = new BehaviorSubject<number>(1);

  cart$ = this.cart.asObservable();
  constructor(
    private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),

  };

  //service to return all contracts Paginado
  getAll(page:number, pageSize:number): Observable<Response>{

    return this.httpClient.get<Response>(`${this.urlAPI}/contractualFolders?pageNo=${page}&pageSize=${pageSize}` ).pipe(
      catchError((e) => {


        console.log('Error obteniendo todos los contratos', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }


   /**
    * get all contracts without pagination
    */
   getAllWithoutPagination(){
    return this.httpClient.get<Response>(`${this.urlAPI}/contractualFolders`).pipe(
      catchError((e) => {


        console.log('Error obteniendo todos los contratos', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
   }
  /**
   * get all filtered contracts pageable
   */

  //service getallFiltered Contracts
  getAllFilteredContracts(page:number, pageSize:number,filter:string,search:string): Observable<Response>{

    return this.httpClient.get<Response>(`${this.urlAPI}/contractualFoldersFilterPattern?pageNo=${page}&pageSize=${pageSize}&filter=${filter}&search=${search}` ).pipe(
      catchError((e) => {


        console.log('Error obteniendo todos los contratos', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }


  //service to return a contract by id
  getContract(id:number): Observable<any>{
    return  this.httpClient.get<any>(this.urlAPI + "/" + id).pipe(
      catchError((e) => {
        console.log('Error obteniendo todos los contratos', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }

  getModalityContractType(type:number,modality:number): Observable<Response>{
    return this.httpClient.get<Response>(`${this.urlAPIModalityType}+?contractTypeId=${type}&modalityId=${modality}`).pipe(
      catchError((e) => {
        console.log('Error obteniendo todas las modalidades por tipo de contrato', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }


  getModalityType(): Observable<Response>{
    return this.httpClient.get<Response>(`${this.urlAPIModality}`).pipe(
      catchError((e) => {
        console.log('Error obteniendo todas las modalidades', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }


  getContractType(): Observable<Response>{
    return this.httpClient.get<Response>(`${this.urlAPIContractType}`).pipe(
      catchError((e) => {


        console.log('Error obteniendo todos los tipos de contrato', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }

  addContract(contract: Contract): Observable<responseDocument>{
    var result = false;
    const body = JSON.stringify(contract);
    return this.httpClient.post<responseDocument>(this.urlAPI, body, this.httpHeader).pipe(
      catchError((e) => {


        console.log('Error creando el contrato', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }

   update(contract: UpdateContract): Observable<responseDocument> {
    const body = JSON.stringify(contract);
    console.log(body)
    return this.httpClient.patch<responseDocument>(this.urlAPI, body , this.httpHeader)
  }
  getContractById(id:number):Observable<responseDocument>{
    return this.httpClient.get<responseDocument>(`${this.urlAPI}/${id}`).pipe(
      catchError((e) => {


        console.log('Error creando el contrato', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }


  private selectedContractId: number | null = null;

  setSelectedContractId(contractId: number) {
    this.selectedContractId = contractId;
    this.cart.next(contractId);
  }

  getSelectedContractId(): number | null {
    return this.selectedContractId;
  }

  //get existe evaluacion
  getExisteEvaluacion(id:idContrato): Observable<boolean>{
    const body = JSON.stringify(id);
    return this.httpClient.post(this.urlAPI + "/existingEvaluationContractByMask",body,this.httpHeader).pipe(
      map((response:any)=> response.data),
      catchError(e=>{
        console.log('error en el servicio contrato get Existencia de evaluacion','error');
        return throwError(e);
      })
    )
  }

  getExisteContrato(id:idContrato): Observable<boolean>{
    const body = JSON.stringify(id);
    return this.httpClient.post(this.urlAPI + "/existingContractByMask",body,this.httpHeader).pipe(
      map((response:any)=> response.data),
      catchError(e=>{
        console.log('error en el servicio contrato get Existencia','error');
        return throwError(e);
      })
    )
  }

  getDatosAside(id:idContrato): Observable<datosAside>{
    const body = JSON.stringify(id);
    return this.httpClient.post(this.urlAPI + "/dataContractVendorByMask",body,this.httpHeader).pipe(
      map((response:any)=> response.data),
      catchError(e=>{
        console.log('error en el servicio contrato gaet dtos del aside','error');
        return throwError(e);
      })
    )
  }
  getTipoContratoCriteriosCoorespondientes(id:idContrato): Observable<descriptionCriteriaContract>{
    return  this.httpClient.get<any>(this.urlAPI + "/aboutVendor?referenceMask=" + id.mascara).pipe(
      map((response: any) => response.data), // Proporcionar un tipo explícito para 'response'
      catchError((e) => {
      console.log('error buscandoCriterios','error');
      return throwError(e);
    })
    )
  }
  getSubCategoriasBienes(): Observable<string[]> {
    return this.httpClient.get<any>(this.urlAPIContractType + "/aboutContractType/Bienes").pipe(
      map((response: any) => {
        // Verificar que la propiedad 'data' existe en la respuesta antes de acceder a ella
        if (response && response.data && response.data.contractType) {
          // Castear la respuesta a un arreglo de strings
          return response.data.contractType as string[];
        } else {
          // Manejar el caso en el que la estructura de la respuesta no sea la esperada
          throw new Error('La estructura de la respuesta no es la esperada getSubCategoriasBienes'+ JSON.stringify(response.data));
        }
      }),
      catchError((error) => {
        console.error('Error buscandoCriterios', error);
        return throwError(error);
      })
    );
  }
  getSubCategoriasServicios(): Observable<string[]> {
    return this.httpClient.get<any>(this.urlAPIContractType + "/aboutContractType/Servicios").pipe(
      map((response: any) => {
        // Verificar que la propiedad 'data' existe en la respuesta antes de acceder a ella
        if (response && response.data && response.data.contractType) {
          // Castear la respuesta a un arreglo de strings
          return response.data.contractType as string[];
        } else {
          // Manejar el caso en el que la estructura de la respuesta no sea la esperada
          throw new Error('La estructura de la respuesta no es la esperada getSubCategoriasServicios:'+ JSON.stringify(response.data));
        }
      }),
      catchError((error) => {
        console.error('Error buscandoCriterios', error);
        return throwError(error);
      })
    );
  }
  getSubCategoriasObras(): Observable<string[]> {
    return this.httpClient.get<any>(this.urlAPIContractType + "/aboutContractType/Obras").pipe(
      map((response: any) => {
        // Verificar que la propiedad 'data' existe en la respuesta antes de acceder a ella
        if (response && response.data && response.data.contractType) {
          // Castear la respuesta a un arreglo de strings
          return response.data.contractType as string[];
        } else {
          // Manejar el caso en el que la estructura de la respuesta no sea la esperada
          throw new Error('La estructura de la respuesta no es la esperada getSubCategoriasObras'+JSON.stringify(response.data));
        }
      }),
      catchError((error) => {
        console.error('Error buscandoCriterios', error);
        return throwError(error);
      })
    );
  }
  getPromedioBienes(anio:string): Observable<number> {

    return this.httpClient.get<any>(this.urlAPI + "/averageContractType/Bienes/"+anio).pipe(
      map((response: any) => {
        // Verificar que la propiedad 'data' existe en la respuesta antes de acceder a ella
        if (response && response.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0].averageContract) {
          // Acceder a 'averageContract' dentro del primer elemento del arreglo 'data'
          return response.data[0].averageContract as number;
        } else {
         // Manejar el caso en el que la estructura de la respuesta no sea la esperada
        console.error(' getPromedioBienes no ha encontrado coincidencias', JSON.stringify(response.data));
        // Retornar cero en caso de error
        return 0;}
      }),
      catchError((error) => {
        console.error('Error buscandogetPromedios', error);
        return throwError(error);
      })
    );
  }
  gePromedioServicios(anio:string): Observable<number> {
    //console.log(this.urlAPI + "/averageContractType/Servicios/"+anio);
    return this.httpClient.get<any>(this.urlAPI + "/averageContractType/Servicios/"+anio).pipe(
      map((response: any) => {
        if (response && response.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0].averageContract) {
          // Acceder a 'averageContract' dentro del primer elemento del arreglo 'data'
          return response.data[0].averageContract as number;
        } else {
          // Manejar el caso en el que la estructura de la respuesta no sea la esperada
         // Manejar el caso en el que la estructura de la respuesta no sea la esperada
        console.error('no ha encontrado coincidencias getPromedio Servicios', JSON.stringify(response.data));
        // Retornar cero en caso de error
        return 0; }
      }),
      catchError((error) => {
        console.error('Error buscandogetPromedios', error);
        return throwError(error);
      })
    );
  }
  getPromediosObras(anio:string): Observable<number> {
    return this.httpClient.get<any>(this.urlAPI + "/averageContractType/Obras/"+anio).pipe(
      map((response: any) => {
        // Verificar que la propiedad 'data' existe en la respuesta antes de acceder a ella
        if (response && response.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0].averageContract) {
          // Acceder a 'averageContract' dentro del primer elemento del arreglo 'data'
          return response.data[0].averageContract as number;
        } else {
          // Manejar el caso en el que la estructura de la respuesta no sea la esperada
        // Manejar el caso en el que la estructura de la respuesta no sea la esperada
        console.error('no ha encontrado coincidencias getPromediosObras', JSON.stringify(response.data));
        // Retornar cero en caso de error
        return 0;
       }
      }),
      catchError((error) => {
        console.error('Error getPromedios', error);
        return throwError(error);
      })
    );
  }

  getAllContratosCalificados(page:number, pageSize:number): Observable<Response>{

    return this.httpClient.get<Response>(`${this.urlAPI}/dataExpiredQualifiedContract?pageNo=${page}&pageSize=${pageSize}` ).pipe(
      catchError((e) => {


        console.log('Error obteniendo todos los contratos', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }

}






































