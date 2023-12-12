import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { Response } from 'src/app/class/response'; // Asegúrese de importar el modelo Response si es necesario
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-consulta-contratos2',
  templateUrl: './consulta-contratos2.component.html',
  styleUrls: ['./consulta-contratos2.component.css'],
  providers: [KeyValuePipe]
})



export class ConsultaContratos2Component implements OnInit {

  contratosCalificados: Response = new Response();

  constructor(private contractService: ContractService) { } // Inyectar ContractService

  ngOnInit() {
    this.loadContratosCalificados(1, 10); // Ejemplo de llamada con página 1 y tamaño de página 10
  }

  loadContratosCalificados(page: number, pageSize: number) {
    this.contractService.getAllContratosCalificados(page, pageSize).subscribe(
      data => {
        this.contratosCalificados = data;
        // console.log('Contratos calificados cargadoss', this.contratosCalificados);
        console.log('Contratos calificados cargados', this.contratosCalificados.data);
      },
      error => {
        console.error('Error al cargar contratos calificados', error);
      }
    );
  }

}
