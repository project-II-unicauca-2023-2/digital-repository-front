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

    printMessage() {
      if (this.responses) {
          const allMessages: string[] = this.responses
          .map((response: UploadExcelFileResponse) => response.messages)
          .flatMap((messages: string[]) => messages);
          console.log('All Messages:', allMessages);

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Multiples errores`
          });
      }
    }

  uploadAndProgress(files: File[]) {
    console.log(files);
    var formData = new FormData();

    files.forEach(f => {
      // Verifica si el archivo tiene la extensión correcta (xlsx)
      if (f.name.endsWith('.xlsx')) {
        formData.append('files', f);
      } else {
        this.notifier.notify('success','Por favor, selecciona archivos Excel válidos.');
        this.emergency_alert()
      }
    });

    if (formData.has('files')) {
      this.http.post('http://localhost:8081/api/scanFile/uploadExcels', formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
          } else if (event instanceof HttpResponse) {
            this.uploadSuccess = true;
            this.responses = event.body;
            this.printMessage();
          }
        });
    }
  }

  upload(event: any) {
    if (event.target instanceof HTMLInputElement) {
      const files: FileList | null = event.target.files;
      if (files) {
        const fileList: File[] = Array.from(files);
        this.uploadAndProgress(fileList);
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
}
