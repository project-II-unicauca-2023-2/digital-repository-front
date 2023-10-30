import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response} from 'src/app/class/response';
import { Observable, catchError, throwError, BehaviorSubject, map } from 'rxjs';
import { Contract } from '../class/contract';
import { responseDocument } from '../class/models/responseDocument';
import { UpdateContract } from '../class/models/UpdateContract';
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
  getExisteEvaluacion(id:string): Observable<boolean>{
    return  this.httpClient.get<any>(this.urlAPI + "/existingEvaluationContractByMask?referenceMask=" + id).pipe(
      map((response: any) => response.data), // Proporcionar un tipo explícito para 'response'
      catchError((e) => {
      console.log('error','error');
      return throwError(e);
    })
    )
  }

  getExisteContrato(id:string): Observable<boolean>{
    return  this.httpClient.get<any>(this.urlAPI + "/existingContractByMask?referenceMask=" + id).pipe(
      map((response: any) => response.data), // Proporcionar un tipo explícito para 'response'
      catchError((e) => {
      console.log('errorContrao','error');
      return throwError(e);
    })
    )
  }


}






































