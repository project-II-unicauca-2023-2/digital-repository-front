import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-carga-archivo',
  templateUrl: './carga-archivo.component.html',
  styleUrls: ['./carga-archivo.component.css']
})

export class CargaArchivoComponent {
  percentDone: number = 0;
  uploadSuccess: boolean = false;
  private readonly notifier: NotifierService;


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
      formData.append('files', file);
    });
  
    this.http.post('https://localhost:8081/api/scanFile/uploadMassiveExcel', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
      } else if (event instanceof HttpResponse) {
        this.uploadSuccess = true;
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
        }
      }
    }
  }
}
