import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { EditContractComponent } from './components/edit-contract/edit-contract.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SearcContractsComponent } from './components/searc-contracts/searc-contracts.component';
import { SettingSystemComponent } from './components/setting-system/setting-system.component';
import { BuscarContratosComponent } from './modulo2/views/buscar-contratos/buscar-contratos.component';
import { CalificacionProveedorComponent } from './modulo2/views/calificacion-proveedor/calificacion-proveedor.component';
import { DashboardComponent } from './modulo2/views/dashboard/dashboard.component';
import { TablaContratosRangoComponent } from './modulo2/views/dashboard/tabla-contratos-rango/tabla-contratos-rango.component';
import { DescargaCalificacionesComponent } from './modulo2/views/descarga-calificaciones/descarga-calificaciones.component';
import { MostrarDescargarComponent } from './modulo2/views/descarga-calificaciones/mostrar-descargar/mostrar-descargar.component';
import { Modulo2ComponentComponent } from './modulo2/views/modulo2-component/modulo2-component.component';
import { SubirInfoComponent } from './modulo2/views/subir-info/subir-info.component';
import { ListContractComponent } from './shared-module/components/list-contract/list-contract.component';
import { ConsultaContratos2Component } from './shared-module/components/consulta-contratos2/consulta-contratos2.component';
import { CargaArchivoComponent } from './modulo2/views/subir-info/carga-archivo/carga-archivo.component';
import { CargarArchivosComponent } from './modulo2/views/subir-info/cargar-archivos/cargar-archivos.component';
import { SubirArchivoComponent } from './modulo2/views/subir-info/subir-archivo/subir-archivo.component';
import { SubirArchivosComponent } from './modulo2/views/subir-info/subir-archivos/subir-archivos.component';


const routes: Routes = [
  // {path:'',component:HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'homePage',
    component: Modulo2ComponentComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'listadoContratistas',
        component: TablaContratosRangoComponent
        },
      { path: 'subirInfo',component:SubirInfoComponent },
      { path: 'descargaFormato', component: DescargaCalificacionesComponent },
      { path: 'calificacion', component: CalificacionProveedorComponent },
      { path: 'Evaluacion/:contrato/:anio', component: MostrarDescargarComponent},
      //{ path: 'buscarcontrato', component: ConsultaContratos2Component},
      {path: 'buscarcontrato',component: BuscarContratosComponent},
      {path: 'carga-archivo', component: CargaArchivoComponent},
      {path: 'cargar-archivos', component: CargarArchivosComponent},
      {path: 'subir-archivo', component: SubirArchivoComponent},
      {path: 'subir-archivos', component: SubirArchivosComponent}

    ] },
  { path: 'createCont', component: CreateContractComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'searchCont', component: SearcContractsComponent },
      { path: 'settingSyst', component: SettingSystemComponent },
      { path: 'listCont', component: ListContractComponent },
      { path: 'editCont', component: EditContractComponent },

      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
  // {path:'searchCont',component:SearcContractsComponent},
  // {path:'createCont',component:CreateContractComponent},
  // {path:'settingSyst',component:SettingSystemComponent},
  // {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
