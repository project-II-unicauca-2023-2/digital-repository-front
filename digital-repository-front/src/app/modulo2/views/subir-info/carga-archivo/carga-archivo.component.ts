import { Component, VERSION } from '@angular/core';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-carga-archivo',
  templateUrl: './carga-archivo.component.html',
  styleUrls: ['./carga-archivo.component.css']
})

export class CargaArchivoComponent {
  percentDone: number = 0;
  uploadSuccess: boolean = false;

  constructor(
    private http: HttpClient,
  ) { }



  uploadAndProgressSingle(file: File[]) {
    this.http.post('https://localhost:8081/api/scanFile/uploadMassiveExcel', file, { reportProgress: true, observe: 'events' })
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
        this.uploadAndProgressSingle(fileList);
      }
    }
  }
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
