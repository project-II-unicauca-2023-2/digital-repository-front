import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { HomeComponent } from './components/home/home.component';
import { SearcContractsComponent } from './components/searc-contracts/searc-contracts.component';
import { SettingSystemComponent } from './components/setting-system/setting-system.component';
import { SideInformationComponent } from './components/side-information/side-information.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModuleModule } from './shared-module/shared-module.module';
//import { TableModule} from './modules/table/table.module';
import { MatCardModule } from '@angular/material/card';
import { TableModule } from '@coreui/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DialogEditComponent } from './components/dialog-edit/dialog-edit.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DocumentsCreateContractComponent } from './components/documents-create-contract/documents-create-contract.component';
import { EditContractComponent } from './components/edit-contract/edit-contract.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PdfViewerDialogComponent } from './components/pdf-viewer-dialog/pdf-viewer-dialog.component';
import { SideInformationDocumentsComponent } from './components/side-information-documents/side-information-documents.component';
import { ProgresoCircularComponent } from './modulo2/componentBasic/progreso-circular/progreso-circular.component';
import { TituloLineaComponent } from './modulo2/componentBasic/titulo-linea/titulo-linea.component';
import { NavBarComponent } from './modulo2/containers/nav-bar/nav-bar.component';
import { ResultadosComponent } from './modulo2/views/calificacionProveedor/resultados/resultados.component';
import { Modulo2ComponentComponent } from './modulo2/views/modulo2-component/modulo2-component.component';
import { FilaService } from './services/fila.service';

import { MatRadioModule } from '@angular/material/radio';
import { DialogSiNoComponent } from './modulo2/componentBasic/dialog-si-no/dialog-si-no.component';
import { CardDialogComponent } from './components/card-dialog/card-dialog.component';
import { ThirdPartyEvaluationComponent } from './components/third-party-evaluation/third-party-evaluation.component';
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
    CardDialogComponent,
    ThirdPartyEvaluationComponent,

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
