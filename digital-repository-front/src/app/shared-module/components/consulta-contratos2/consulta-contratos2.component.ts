import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { Response } from 'src/app/class/response'; // Asegúrese de importar el modelo Response si es necesario
import { KeyValuePipe } from '@angular/common';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { yearsPerPage } from '@angular/material/datepicker';

@Component({
  selector: 'app-consulta-contratos2',
  templateUrl: './consulta-contratos2.component.html',
  styleUrls: ['./consulta-contratos2.component.css'],
  providers: [KeyValuePipe]
})



export class ConsultaContratos2Component implements OnInit {

  dataSource = new MatTableDataSource<any>(); // DataSource para la tabla
  displayedColumns: string[] = ['id', 'referencia', 'vendorId', 'contractType', 'modality', 'initialDate', 'finalDate', 'scoreTotal', 'descarga']; // Columnas que se mostrarán

  @ViewChild(MatPaginator) paginator?: MatPaginator; // Marca paginator como opcional


  constructor(private contractService: ContractService, private ruta: Router) { }

  ngOnInit() {
    this.loadContratosCalificados(1, 10);
  }

  loadContratosCalificados(page: number, pageSize: number) {
    this.contractService.getAllContratosCalificados(page, pageSize).subscribe(
      data => {
        this.dataSource.data = Object.values(data.data);
        this.dataSource.filterPredicate = (data, filter) => {
          // Ajusta esta función para filtrar según tus necesidades
          const dataStr = JSON.stringify(data).toLowerCase();
          return dataStr.includes(filter);
        };

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      error => {
        console.error('Error al cargar contratos calificados', error);
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // setIdContract(id: string, anio: Date) {
  //   this.ruta.navigate(["homePage/Evaluacion", id, anio]);
  // }
  
  setIdContract(id: string, anio: string) {
    const date = new Date(anio);
    const year = date.getFullYear();
    this.ruta.navigate(["homePage/Evaluacion", id, year]);
  }


  selectedRowIndex: number = -1;
  selectRow(index: number) {
    this.selectedRowIndex = index;
  }

}
