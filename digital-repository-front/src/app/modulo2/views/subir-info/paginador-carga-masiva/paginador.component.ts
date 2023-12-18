import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ContractEvaluationInfo } from '../carga-masiva/carga-archivo.component';
import { DataService } from '../data.service';


@Component({
  selector: 'app-paginador-carga-masiva',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css'],
})

export class  PaginadorComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'vendorName',
    'identification',
    'initialDate',
    'finalDate',
    'contractTypeId',
    'totalScore'
  ];
  

  dataSource = new MatTableDataSource<any>(); 

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private dataService: DataService) {}

  pageSizes = [5];

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  

  ngOnInit(): void {
    this.dataService.contractInfo$.subscribe((contractInfoArray: ContractEvaluationInfo[]) => {
      // console.log('Datos del contrato:', contractInfoArray);
      this.dataSource.data = contractInfoArray;
    });
  }

}
