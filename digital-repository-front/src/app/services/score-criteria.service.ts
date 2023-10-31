
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { scoreCriteria } from '../modulo2/models/scoreCriteria';

@Injectable({
  providedIn: 'root'
})
export class ScoreCriteriaService {
  private urlAPI = 'http://localhost:8081/api/scoreCriteria';
  private cart = new BehaviorSubject<number>(1);

  cart$ = this.cart.asObservable();
  constructor(
    private httpClient: HttpClient) { }

    httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
  
    };
  getResultadosEvaluacion(id:string): Observable<scoreCriteria[]>{
    return  this.httpClient.get<any>(this.urlAPI + "/scoreCriteriaDataByMask?referenceMask=" + id).pipe(
      map((response: any) => response.data), // Proporcionar un tipo explícito para 'response'
      catchError((e) => {
      console.log('error en el servicio scoreCriteria getResultadosEvaluacion','error');
      return throwError(e);
    })
      
    )
  }
  
}
