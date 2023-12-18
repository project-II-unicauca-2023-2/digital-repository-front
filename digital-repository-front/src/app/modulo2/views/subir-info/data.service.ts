import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContractEvaluationInfo } from './carga-masiva/carga-archivo.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private contractInfoSource = new BehaviorSubject<ContractEvaluationInfo[]>([]);
  contractInfo$ = this.contractInfoSource.asObservable();

  updateContractInfo(contractInfoArray: ContractEvaluationInfo[]): void {
    this.contractInfoSource.next(contractInfoArray);
  }

  clearContractInfo(): void {
    this.contractInfoSource.next([]);
  }
}