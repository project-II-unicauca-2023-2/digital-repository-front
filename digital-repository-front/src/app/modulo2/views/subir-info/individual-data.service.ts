import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContractEvaluationInfo } from './cargar-individuales/cargar-archivos.component';

@Injectable({
  providedIn: 'root',
})
export class IndividualDataService {
  private contractInfoSource = new BehaviorSubject<ContractEvaluationInfo[]>([]);
  contractInfo$ = this.contractInfoSource.asObservable();

  updateContractInfo(contractInfoArray: ContractEvaluationInfo[]): void {
    this.contractInfoSource.next(contractInfoArray);
  }

  clearContractInfo(): void {
    this.contractInfoSource.next([]);
  }
}