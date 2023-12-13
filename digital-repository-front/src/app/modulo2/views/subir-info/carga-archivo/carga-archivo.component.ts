import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';

// Define la interfaz para MessageType
enum MessageType {
  CONTRACT_NOT_FOUND,
  EVALUATION_SAVED,
  EVALUATION_ALREADY_EXISTS,
  VALIDATION
}

// Define la interfaz para ContractEvaluationInfo
class ContractEvaluationInfo {
  vendorName!: string;
  identification!: string;
  initialDate!: Date;
  finalDate!: Date;
  subject!: string;
  contractTypeId!: number;
  qualityRate!: number;
  complianceRate!: number;
  excecutionRate!: number;
  totalScore!: number;
}

// Define la interfaz para UploadExcelFileResponse
class UploadExcelFileResponse {
  reference!: string;
  messageType!: MessageType;
  messages!: string[];
  contractInfo!: ContractEvaluationInfo;
}

@Component({
  selector: 'app-carga-archivo',
  templateUrl: './carga-archivo.component.html',
  styleUrls: ['./carga-archivo.component.css']
})

export class CargaArchivoComponent {
  percentDone: number = 0;
  uploadSuccess: boolean = false;
  private readonly notifier: NotifierService;
  responses!: UploadExcelFileResponse[] | any;


  constructor(
    private http: HttpClient, notifierService: NotifierService) {
      this.notifier = notifierService;
    }

  isExcelFile(file: File): boolean {
    return file.name.endsWith('.xls') || file.name.endsWith('.xlsx');
  }

  uploadAndProgressSingle(files: File[]) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file);
    });

    this.http.post('http://localhost:8081/api/scanFile/uploadMassiveExcel', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
      } else if (event instanceof HttpResponse) {
        this.uploadSuccess = true;
        this.responses = event.body;
        this.printMessages();
      }
    });
  }

  upload(event: any) {
    if (event.target instanceof HTMLInputElement) {
      const files: FileList | null = event.target.files;
      if (files) {
        const fileList: File[] = Array.from(files);
        // Filtrar solo archivos Excel
        const excelFiles: File[] = fileList.filter(this.isExcelFile);

        if (excelFiles.length > 0) {
          this.uploadAndProgressSingle(excelFiles);
        } else {

          this.notifier.notify('success','Por favor, selecciona archivos Excel válidos.');
          this.emergency_alert()
        }
      }
    }
  }

  emergency_alert(){

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: 'El tipo de formato debe ser Excel'
    });

  }

  printMessages() {
    if (this.responses) {
      // Utiliza map para extraer el array de mensajes de cada respuesta
      const allMessages: string[] = this.responses
        .map((response: UploadExcelFileResponse) => response.messages)
        // Utiliza flatMap para combinar todos los arrays de mensajes en uno solo
        .flatMap((messages: string[]) => messages)
        // Utiliza un Set para eliminar elementos duplicados
        .filter((message: any, index: any, self: string | any[]) => self.indexOf(message) === index);

      console.log('All Messages:', allMessages);

      if (allMessages.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Se encontraron estos errores al cargar el archivo: \n",
          text: `${allMessages}`
        });
      }
    }
  }


}
