import { Component, Input, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { LocationStrategy } from '@angular/common';

import { PeriodicElement } from 'src/app/class/models/PeriodicElement';
import { SelectionModel } from '@angular/cdk/collections';
import { ContractService } from 'src/app/services/contract.service';
import { FormControl } from '@angular/forms';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Modality } from 'src/app/class/models/Modality';
import { ContractType } from 'src/app/class/models/ContractType';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-consulta-contratos',
  templateUrl: './consulta-contratos.component.html',
  styleUrls: ['./consulta-contratos.component.css']
})
export class ConsultaContratosComponent {

  contracts: PeriodicElement[] = [];
  displayedColumns: string[] = ['Id', 'Código',  'Id. Contratista','Tipo de Contrato','Modalidad',  'Año de Suscripcion'];
  totalElements: number = 0;
  totalPages: number = 1;
  pageSize: number = 5;

  contractsType: ContractType[] = [];
  modalityTypes: Modality[] = [];
  // checkbox selection
  selection = new SelectionModel<PeriodicElement>(true, []);
  filterOptions = [ 'Modalidad', 'Tipo de Contrato', 'Contratista', 'Año'];
  yearOptions = [""];
  modalityOptions =[''];
  contractTypeOptions= [''];
  vendorOptions = ['1061']
  // Control del primer select
  filterControl = new FormControl('');

  // Control del segundo select
  secondFilterControl = new FormControl('');

  selectedFirstFilter: string = ''; // Variable para almacenar la opción seleccionada del primer filtro
  selectedSecondFilter: string = ''; // Variable para almacenar la opción seleccionada del segundo filtro

  pressedSettingsButton: boolean = false
  isFilterApplied: boolean = false
  isSearchApplied: boolean = false
  allContracts: PeriodicElement[] = [];

  searchValue: string = '';
  selectedFilter: string = '';
  selectedFilterValue: string = '';

  @Output('checkedContract') checkedContract = new EventEmitter<number>();

  formRadio1 = new UntypedFormGroup({
    radio1: new UntypedFormControl('Radio1')
  });

  constructor(
    private contractService: ContractService,

  ) {

  }



  ngOnInit() {
    this.loadContractType();
    this.loadModalityType();
    this.loadTableContracts([0, 5]);
    this.fillContractType();
    const currentYear = new Date().getFullYear();
    const startYear = 2010;
    for (let year = currentYear; year >= startYear; year--) {
      this. yearOptions.push(year.toString());
  }
}
  //method return 1 Modality
  public loadModalityType() {
    this.contractService.getModalityType().subscribe((response) => {
      console.log('Del servicio tipos modalidad ', response);
      this.modalityTypes = response.data.data as Modality[];
      for (const c of this.modalityTypes) {
        this.modalityOptions.push(c.name);
      }
    });

  }
  //method return 1 ContractType
  public loadContractType() {
    this.contractService.getContractType().subscribe((response) => {
      console.log('Del servicio tipos contracto', response);
      this.contractsType = response.data.data as ContractType[];
      for (const c of this.contractsType) {
        this.contractTypeOptions.push(c.name);
      }
      console.log(this.contractTypeOptions)
    });

  }
  fillContractType() {
    for (const c of this.contractsType) {
      this.contractTypeOptions.push(c.name);

    }
    for (const c of this.modalityTypes) {
      this.modalityOptions.push(c.name);
    }
  }
  isSelectedColumn(column: string): boolean {
    return column === 'selected';
  }

  /**  cargar los contenidos de la tabla segun si esta filtrado o es generico
  *   @param args paginado para consumir los servicios
  */
  loadTableContracts(args: number[]) {
    let pageNo: number = args[0];
    let pageSize: number = args[1]
    if (this.isFilterApplied) {
      let selectedFilter = this.filterControl.value;
      let selectedValue = this.secondFilterControl.value;
      if (selectedFilter == null || selectedValue == null || selectedFilter == "" || selectedValue == "") {
        selectedFilter = "SUPERSCRIBE-YEAR"; // Asignar el valor solo si no es null
        selectedValue = "2023"
      }

      this.selectedFilter = this.getValueFilter();
      this.selectedFilterValue = this.selectedSecondFilter
      console.log("Filtrando ", this.selectedFilter, this.selectedFilterValue)
      this.contractService.getAllFilteredContracts(pageNo, pageSize, this.selectedFilter, this.selectedFilterValue).subscribe((response) => {
        console.log("Del servicio get all filtered  ", response)
        this.contracts = response.data.data as PeriodicElement[]
        this.totalElements = response.data.totalElements as number
        this.totalPages = response.data.totalPages as number
        this.pageSize = response.data.pageSize as number

      })
    } else if (this.isSearchApplied) {
      const selectedFilter = "REFERENCE"
      this.selectedFilter = selectedFilter
      this.selectedFilterValue = this.searchValue
      this.contractService.getAllFilteredContracts(pageNo, pageSize, this.selectedFilter, this.selectedFilterValue).subscribe((response) => {
        console.log("Del servicio get all filtered  ", response)
        this.contracts = response.data.data as PeriodicElement[]
        this.totalElements = response.data.totalElements as number
        this.totalPages = response.data.totalPages as number
        this.pageSize = response.data.pageSize as number

      })
    }
    else {

      this.contractService.getAll(pageNo, pageSize).subscribe((response) => {
        this.contracts = response.data.data as PeriodicElement[]
        this.totalElements = response.data.totalElements as number
        this.totalPages = response.data.totalPages as number
        this.pageSize = response.data.pageSize as number
        this.isFilterApplied = false

      })
    }

  }

  getValueFilter(){
    const selectedFilter = this.selectedFirstFilter
    switch (selectedFilter) {
      case 'Año':
        return "SUPERSCRIBE-YEAR";
      case 'Modalidad':
        return "MODALITY";
      case 'Tipo de Contrato':
        return "TYPE";
      case 'Contratista':
        return "VENDOR";
      default:
        return '';
    }

  }
  /**
   * obtiene valores del filtro
   * @returns retorna el array de opciones para los vlaores del filtro
   */
  getSecondFilterOptions() {
    // const selectedFilter = this.filterControl.value;
    const selectedFilter = this.selectedFirstFilter
    switch (selectedFilter) {
      case 'Año':
        return this.yearOptions;
      case 'Modalidad':
        return this.modalityOptions;
      case 'Tipo de Contrato':
        return this.contractTypeOptions;
      case 'Contratista':
        return this.vendorOptions;
      default:
        return [];
    }
  }

  /**
   * llama a cargar los datos según la info del form
   */
  filterData() {

    this.isFilterApplied = true

    this.loadTableContracts([0, 5])
  }

  /**
   * Activa o inactiva el boton de filtros
   */
  toggleSettingButton() {
    this.pressedSettingsButton = !this.pressedSettingsButton

  }
  /**
   * Lee los cambios del componente y obtiene el array de contratos
   * @param changes cambios del componente
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['contracts'] && changes['contracts'].currentValue) {
      const updatedContracts = changes['contracts'].currentValue;

      if (updatedContracts.length > 0) {
        // acceder a los datos actualizados en `updatedContracts`
        console.log('Contratos actualizados:', updatedContracts);

        // Inicializa MatTableDataSource con los datos actualizados
        this.contracts = updatedContracts


      }
    }
  }

  setIdContract(id: number) {
    this.contractService.setSelectedContractId(id);
    localStorage.setItem('id', id.toString())
    this.checkedContract.emit(id)
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.contracts.length;
    return numSelected === numRows;


  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.contracts);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /** Format date for Year */
  formatSigningYear(year: Date): string {
    return year.getFullYear().toString();
  }

  /** Format date for signingDate */
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    return date.toLocaleString('en-US', options);
  }
  /**
   * Asignar el valor del boton, se pinta el que este seleccionado
   * ejecuta la busqueda por default o la busqueda fltrada
   * @param value valor del boton
   */
  setRadioValue(value: string): void {
    //
    //si es filtrar filtra con los datos seleccionados; sino tablaDefault
    this.formRadio1.setValue({ radio1: value });
    if (value == 'filtrar') {
      this.filterData()
    } else {
      this.resetFilter()
      this.loadTableContracts([0, 5])
    }
  }

  /**
   * hace reset de los filtros y sus valores
   */
  resetFilter() {
    this.isFilterApplied = false
    this.isSearchApplied = false
    this.selectedFirstFilter = " "
    this.selectedSecondFilter = " "
    this.filterControl.reset('');
    this.secondFilterControl.reset('');
  }

  applyFilter(event: HTMLInputElement) {
    //this.loadTableContracts([0,10])
    // const filterValue = (event.target as HTMLInputElement).value;
    // const filteredContracts = this.contracts.filter(contract =>
    //   contract.contractType.toLowerCase() === filterValue.toLowerCase()
    // );
    // this.contracts = filteredContracts
    //   console.log(filteredContracts)

    const searchValue = (event as HTMLInputElement).value.trim().toLowerCase();
    console.log("search value ", searchValue)
    if (searchValue == '' || searchValue == null) {
      this.resetFilter()
    } else {
      this.isSearchApplied = true
      this.isFilterApplied = false

      this.searchValue = searchValue
    }


    this.loadTableContracts([0, 5])
  }

  selectFirstFilter(option: string) {
    this.selectedFirstFilter = option;
  }

  selectSecondFilter(option: string) {
    this.selectedSecondFilter = option;
  }
}
