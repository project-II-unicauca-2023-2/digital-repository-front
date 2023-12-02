import { Component } from '@angular/core';
import { PeriodicElement } from 'src/app/class/models/PeriodicElement';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-buscar-contratos',
  templateUrl: './buscar-contratos.component.html',
  styleUrls: ['./buscar-contratos.component.css']
})
export class BuscarContratosComponent {
  contracts:PeriodicElement[]=[];

  constructor(
    private contractService:ContractService
  )
  {}
  ngOnInit(): void {
    //this.getAllContracts()
    // this.contractService.getAll(0,10).subscribe((response) => {
    //   console.log("Del servicio ",response)
    //   this.contracts = response.data

    // })
  }

  getAllContracts(){
    this.contractService.getAll(0,10).subscribe((response) => {
      console.log("Del servicio ",response)
      this.contracts = response.data.data

    })
  }

  onCheckedContract(idContract : number){
    //console.log(idContract)
  }
}
