import { Component } from '@angular/core';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { measureMemory } from 'vm';
import { IndividualDataService } from '../individual-data.service';


// Define la interfaz para MessageType
enum MessageType {
  CONTRACT_NOT_FOUND,
  EVALUATION_SAVED,
  EVALUATION_ALREADY_EXISTS,
  VALIDATION
}

// Define la interfaz para ContractEvaluationInfo
export class ContractEvaluationInfo {
  vendorName!: string;
  identification!: string;
  initialDate!: Date;
  finalDate!: Date;
  subject!: string;
  contractTypeId!: number;
  qualityRate!: number;
  complianceRate!: number;
  executionRate!: number;
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
  selector: 'app-carga-archivos',
  templateUrl: './cargar-archivos.component.html',
  styleUrls: ['./cargar-archivos.component.css']
})

export class CargarArchivosComponent {
  percentDone: number = 0;
  uploadSuccess: boolean = false;
  responses!: UploadExcelFileResponse[] | any;
  cont: number = 0;
  consoleMessages: string[] = [];

  constructor(
    private http: HttpClient,private dataService: IndividualDataService) {}

    printMessage() {
      if (this.responses) {
          const allMessages: string[] = this.responses
          .map((response: UploadExcelFileResponse) => response.messages)
          .flatMap((messages: string[]) => messages);
          console.log('All Messages:', allMessages);

          this.responses.forEach((response: UploadExcelFileResponse) => {
            if(MessageType[response.messageType] == '0' || MessageType[response.messageType] == '2' || MessageType[response.messageType] == '3'){
              this.cont = this.cont + 1;
            }
            console.log(`MessageType: ${MessageType[response.messageType]}`);
            });

          console.log(this.cont);

          if(this.cont == 0){
            Swal.fire({
              icon: 'success',
              title: `${allMessages}`
            });
          }else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${allMessages}`
            });
            this.cont = 0;
          }
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
            this.dataService.updateContractInfo(this.responses);
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

