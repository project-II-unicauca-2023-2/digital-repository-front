import { Component, VERSION } from '@angular/core';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './cargar-archivos.component.html',
  styleUrls: ['./cargar-archivos.component.css']
})

export class CargarArchivosComponent {
  percentDone: number = 0;
  uploadSuccess: boolean = false;

  constructor(
    private http: HttpClient,
  ) { }

  uploadAndProgress(files: File[]){
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    
    this.http.post('https://localhost:8081/api/scanFile/uploadExcels', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
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
        this.uploadAndProgress(fileList);
      }
    }
  }
}