import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  FileDown,
  FileEdit,
  FilePlus,
  FileText,
  FileUp,
  FileX,
  FolderDown,
  FolderPlus,
  Home,
  LucideAngularModule,
  Pencil,
  ScrollText,
  Search,
  Settings,
  SlidersHorizontal,
  X,
} from 'lucide-angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { DialogEditComponent } from './components/dialog-edit/dialog-edit.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DocumentsCreateContractComponent } from './components/documents-create-contract/documents-create-contract.component';
import { EditContractComponent } from './components/edit-contract/edit-contract.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PdfViewerDialogComponent } from './components/pdf-viewer-dialog/pdf-viewer-dialog.component';
import { SearcContractsComponent } from './components/searc-contracts/searc-contracts.component';
import { SettingSystemComponent } from './components/setting-system/setting-system.component';
import { SideInformationDocumentsComponent } from './components/side-information-documents/side-information-documents.component';
import { SideInformationComponent } from './components/side-information/side-information.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProgresoCircularComponent } from './modulo2/componentBasic/progreso-circular/progreso-circular.component';
import { TituloLineaComponent } from './modulo2/componentBasic/titulo-linea/titulo-linea.component';
import { CardDialogComponent } from './modulo2/containers/card-dialog/card-dialog.component';
import { NavBarComponent } from './modulo2/containers/nav-bar/nav-bar.component';
import { Asidem2Component } from './modulo2/views/calificacion-proveedor/asidem2/asidem2.component';
import { ResultadosComponent } from './modulo2/views/calificacion-proveedor/resultados/resultados.component';
import { Modulo2ComponentComponent } from './modulo2/views/modulo2-component/modulo2-component.component';
import { FilaService } from './services/fila.service';
import { SharedModuleModule } from './shared-module/shared-module.module';

import { FooterComponent } from './modulo2/containers/footer/footer.component';

import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdvancedPieChartComponent } from './modulo2/componentBasic/advanced-pie-chart/advanced-pie-chart.component';
import { ChipsComponent } from './modulo2/componentBasic/chips/chips.component';
import { DesplegableAniosComponent } from './modulo2/componentBasic/desplegable-anios/desplegable-anios.component';
import { DialogSiNoComponent } from './modulo2/componentBasic/dialog-si-no/dialog-si-no.component';
import { LineaCalificacionComponent } from './modulo2/componentBasic/linea-calificacion/linea-calificacion.component';
import { PieGridChartComponent } from './modulo2/componentBasic/pie-grid-chart/pie-grid-chart.component';
import { VerticalBarChartComponent } from './modulo2/componentBasic/vertical-bar-chart/vertical-bar-chart.component';
import { BuscarContratosComponent } from './modulo2/views/buscar-contratos/buscar-contratos.component';
import { BuscarProveedorComponent } from './modulo2/views/calificacion-proveedor/buscar-proveedor/buscar-proveedor.component';
import { CalificacionProveedorComponent } from './modulo2/views/calificacion-proveedor/calificacion-proveedor.component';
import { AsideFiltroComponent } from './modulo2/views/dashboard/aside-filtro/aside-filtro.component';
import { DashboardComponent } from './modulo2/views/dashboard/dashboard.component';
import { TablaContratosRangoComponent } from './modulo2/views/dashboard/tabla-contratos-rango/tabla-contratos-rango.component';
import { DescargaCalificacionesComponent } from './modulo2/views/descarga-calificaciones/descarga-calificaciones.component';
import { MostrarDescargarComponent } from './modulo2/views/descarga-calificaciones/mostrar-descargar/mostrar-descargar.component';
import { SubirInfoComponent } from './modulo2/views/subir-info/subir-info.component';

import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { ChipsComponent } from './modulo2/componentBasic/chips/chips.component';
import { DesplegableAniosComponent } from './modulo2/componentBasic/desplegable-anios/desplegable-anios.component';
import { LineaCalificacionComponent } from './modulo2/componentBasic/linea-calificacion/linea-calificacion.component';
import { BuscarContratosComponent } from './modulo2/views/buscar-contratos/buscar-contratos.component';
import { PieGridChartComponent } from './modulo2/componentBasic/pie-grid-chart/pie-grid-chart.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { VerticalBarChartComponent } from './modulo2/componentBasic/vertical-bar-chart/vertical-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearcContractsComponent,
    SidebarComponent,
    SettingSystemComponent,
    SideInformationComponent,
    CreateContractComponent,
    LayoutComponent,
    DialogEditComponent,
    EditContractComponent,
    DialogComponent,
    PdfViewerDialogComponent,
    DocumentsCreateContractComponent,
    SideInformationDocumentsComponent,
    Modulo2ComponentComponent,
    NavBarComponent,
    ProgresoCircularComponent,
    TituloLineaComponent,
    ResultadosComponent,
    DialogSiNoComponent,
    Asidem2Component,
    CardDialogComponent,
    CalificacionProveedorComponent,
    BuscarProveedorComponent,
    DescargaCalificacionesComponent,
    SubirInfoComponent,
    DashboardComponent,
    FooterComponent,
    MostrarDescargarComponent,
    ChipsComponent,
    DesplegableAniosComponent,
    LineaCalificacionComponent,
    BuscarContratosComponent,
    PieGridChartComponent,
    DashboardComponent,
    VerticalBarChartComponent,
    AdvancedPieChartComponent,

  ],
  imports: [
    
    MatRadioModule,
    NgCircleProgressModule.forRoot({
      //realizamos la importacion del modulo que maneja grafico de progreso en un diagrama circular
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      units: "PUNTOS",

    }),
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    IconModule,
    AppRoutingModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatDividerModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    MatTableModule,
    SharedModuleModule,
    MatDividerModule,
    MatListModule,
    PdfViewerModule,
    MatGridListModule,
    MatCardModule,

    ToastrModule.forRoot(),
    LucideAngularModule.pick({
      Home,
      Search,
      Settings,
      Check,
      X,
      FolderPlus,
      CalendarDays,
      ChevronRight,
      ScrollText,
      ChevronLeft,
      SlidersHorizontal,
      FileUp,
      FileEdit,
      FileDown,
      FilePlus,
      Pencil,
      FolderDown,FileText,FileX,
    }),
    BrowserAnimationsModule,
    MatTableModule,
    CommonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgScrollbarModule,MatCardModule,
    MatSidenavModule,    
    NgxChartsModule,
    MatChipsModule,
    MatSelectModule,
    MatToolbarModule,
    MatSliderModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
    MatTooltipModule,
  ],
  providers: [
    IconSetService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    FilaService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
