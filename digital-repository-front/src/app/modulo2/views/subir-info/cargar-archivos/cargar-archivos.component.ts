import { Component } from '@angular/core';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-carga-archivos',
  templateUrl: './cargar-archivos.component.html',
  styleUrls: ['./cargar-archivos.component.css']
})

export class CargarArchivosComponent {
  percentDone: number = 0;
  uploadSuccess: boolean = false;
  private readonly notifier: NotifierService;


  constructor(
    private http: HttpClient, notifierService: NotifierService) { 
      this.notifier = notifierService;
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
      }
    });

    if (formData.has('files')) {
      this.http.post('http://localhost:8081/api/scanFile/uploadExcels', formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
          } else if (event instanceof HttpResponse) {
            this.uploadSuccess = true;
            console.log(event.body);
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
}

