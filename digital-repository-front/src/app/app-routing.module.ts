import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { EditContractComponent } from './components/edit-contract/edit-contract.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SearcContractsComponent } from './components/searc-contracts/searc-contracts.component';
import { SettingSystemComponent } from './components/setting-system/setting-system.component';
import { ResultadosComponent } from './modulo2/views/calificacionProveedor/resultados/resultados.component';
import { Modulo2ComponentComponent } from './modulo2/views/modulo2-component/modulo2-component.component';
import { ListContractComponent } from './shared-module/components/list-contract/list-contract.component';
import { Asidem2Component } from './modulo2/containers/asidem2/asidem2.component';
import { ThirdPartyEvaluationComponent } from './modulo2/containers/third-party-evaluation/third-party-evaluation.component';



const routes: Routes = [
  // {path:'',component:HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'homePage',
    component: Modulo2ComponentComponent,
    children: [
      { path: 'resultados', component: ResultadosComponent },
      {path: 'asidem2',component:Asidem2Component},
      { path: 'contract', component: ThirdPartyEvaluationComponent },
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
