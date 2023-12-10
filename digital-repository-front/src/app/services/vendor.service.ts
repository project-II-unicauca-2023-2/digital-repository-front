import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { userData } from '../modulo2/models/userData';
@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private urlAPI = 'http://localhost:8081/api/vendor';
  
  constructor(
    private httpClient: HttpClient) { }

    httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
  
    };
    getScoreVendors(id:number[],anio:string): Observable<userData[]>{
      const body = JSON.stringify(id);
      return this.httpClient.post(this.urlAPI + "/dataAboutVendors/"+anio,body,this.httpHeader).pipe(
        map((response:any)=> response.data),
        catchError(e=>{
          console.log('error en el servicio listando usuarios','error');
          return throwError(e);
        })
      )
    }
}
