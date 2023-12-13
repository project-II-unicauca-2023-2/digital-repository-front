import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { KeyValuePipe } from '@angular/common';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent, yearsPerPage } from '@angular/material/datepicker';


@Component({
  selector: 'app-consulta-contratos2',
  templateUrl: './consulta-contratos2.component.html',
  styleUrls: ['./consulta-contratos2.component.css'],
  providers: [KeyValuePipe]
})

export class ConsultaContratos2Component implements OnInit {

  dataSource = new MatTableDataSource<any>(); // DataSource para la tabla
  displayedColumns: string[] = [ 'referencia', 'contractType', 'modality', 'initialDate', 'finalDate', 'scoreTotal', 'descarga']; // Columnas que se mostrarán
  selectedFilter: string | undefined; 
  
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


  applyScoreTotalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue) {
      this.dataSource.filter = '';
    } else {
      // Convertir el valor a un número y redondear a un decimal
      const filterNumber = Math.round(parseFloat(filterValue) * 10) / 10;
  
      this.dataSource.filterPredicate = (data) => {
        // Redondear el valor de la calificación en los datos a un decimal para la comparación
        const roundedScore = Math.round(data.scoreTotal * 10) / 10;
        return roundedScore === filterNumber;
      };
      this.dataSource.filter = filterNumber.toString();
    }
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  applyDateFilter(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.dataSource.filterPredicate = (data) => {
        const initialDate = new Date(data.initialDate);
        return initialDate.setHours(0, 0, 0, 0) === selectedDate.setHours(0, 0, 0, 0);
      };
      this.dataSource.filter = selectedDate.toISOString(); // Actualiza el filtro
    } else {
      this.dataSource.filter = '';
    }
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFinalDateFilter(event: MatDatepickerInputEvent<Date>) {
    const selectedFinalDate = event.value;
    if (selectedFinalDate) {
      this.dataSource.filterPredicate = (data) => {
        const finalDate = new Date(data.finalDate);
        return finalDate.setHours(0, 0, 0, 0) === selectedFinalDate.setHours(0, 0, 0, 0);
      };
      this.dataSource.filter = selectedFinalDate.toISOString(); // Actualiza el filtro
    } else {
      this.dataSource.filter = '';
    }
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  clearFilters() {
    // Restablecer el filtro a su estado predeterminado
    this.dataSource.filterPredicate = (data, filter) => {
      return true; // Muestra todos los datos
    };
    this.dataSource.filter = '';
  
    // Restablecer el selector de tipo de filtro a "Ninguno"
    this.selectedFilter = '';
  
    // Restablecer otros controles de filtro si los hay (por ejemplo, sliders, selectores de fecha, etc.)
    // Aquí puedes restablecer los valores de otros controles de filtro si es necesario
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
  
  
  
  
  

}
