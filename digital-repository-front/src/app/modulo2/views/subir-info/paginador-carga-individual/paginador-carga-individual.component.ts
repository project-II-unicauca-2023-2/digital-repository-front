
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ContractEvaluationInfo } from '../cargar-individuales/cargar-archivos.component';
import { IndividualDataService } from '../individual-data.service';

@Component({
  selector: 'app-paginador-carga-individual',
  templateUrl: './paginador-carga-individual.component.html',
  styleUrls: ['./paginador-carga-individual.component.css']
})

export class  PaginadorCargaIndividualComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'vendorName',
    'identification',
    'initialDate',
    'finalDate',
    'contractTypeId',
    'totalScore'
  ];
  columnNameMapping: { [key: string]: string } = {
    'vendorName': 'Nombre del proveedor',
    'identification': 'Identificación',
    'initialDate': 'Fecha de inicio',
    'finalDate': 'Fecha de finalización',
    'contractTypeId': 'Tipo de contrato',
    'totalScore': 'Puntuación total'
    // Agrega otros mapeos según sea necesario
  };
  


  dataSource = new MatTableDataSource<ContractEvaluationInfo>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: IndividualDataService) {}

  pageSizes = [5];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataService.contractInfo$.subscribe((contractInfoArray: ContractEvaluationInfo[]) => {
      console.log('Datos del contrato:', contractInfoArray);
      this.dataSource.data = contractInfoArray;
    });
  }

}