
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { responseDocument } from '../class/models/responseDocument';
import { calificacion } from '../modulo2/models/calificacion';
import { idContrato } from '../modulo2/models/idContrato';
import { totalCriteriaScore } from '../modulo2/models/totalCriteriaScore';

interface dicCriteria {
  dicPuntaje: { [key: number]: string };
}

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
  getResultadosEvaluacion(id:idContrato): Observable<totalCriteriaScore>{
    return  this.httpClient.get<any>(this.urlAPI + "/scoreCriteriaDataByMask?referenceMask=" + id.mascara).pipe(
      map((response: any) => response.data), // Proporcionar un tipo explícito para 'response'
      catchError((e) => {
      console.log('error en el servicio scoreCriteria getResultadosEvaluacion','error');
      return throwError(e);
    })
      
    )
  }
  getDominioCalificacion(): Observable<dicCriteria> {
    return this.httpClient.get<any>(this.urlAPI + '/calificationDomain').pipe(
      map((response: any) => {
        const listCalificationDomain = response.data.listCalificationDomain;
        const dicPuntaje: { [key: number]: string } = {};
        listCalificationDomain.forEach((item: any) => {
          dicPuntaje[item.value] = item.label;
        });
        return { dicPuntaje };
      }),
      catchError((e) => {
        console.log('error en el servicio obtener dominio de scorecriteria', 'error');
        return throwError(e);
      })
    );
  }
  addCalificaciones(calificados: calificacion): Observable<responseDocument>{
    //alert("guardando");
    const body = JSON.stringify(calificados);
    console.log("guardando"+body);
    return this.httpClient.post<responseDocument>(this.urlAPI+"/registerCalification/", body, this.httpHeader).pipe(
      catchError((e) => {
        console.log('Error Guardando Calificacion', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }
  
}
