import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Fila } from 'src/app/class/models/Fila';
import { FilaService } from 'src/app/services/fila.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  encapsulation: ViewEncapsulation.None, // Desactivar la encapsulación de estilos
})
export class DialogComponent {
  pdfUrl = '';
  s='';
  UrlD='';
  myForm!: FormGroup;
  nuevaFila:Fila=new Fila();
  filas: any[] = [];
  nuevaFilaEvent: EventEmitter<any[]> = new EventEmitter<any[]>();
  //Fechas
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: string | null;
  acordeonAbierto = false;
  selectedFile: File | undefined;
  constructor(
    private toastrSvc:ToastrService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string ) {
      this.s=data;
      //console.log(this.s)
      this.dialogRef.disableClose = true;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,): void {

    // const Dialog1 = this.dialog.open(DialogAnimation, {
    //   width: '250px',
    //   enterAnimationDuration,
    //   exitAnimationDuration,
    // });

    // Dialog1.afterClosed().subscribe((result) => {
    //   if (result === 'Si') {
    //     if (this.dialogRef) {

    //       const name = this.myForm.value.name;
    //       const type = this.myForm.value.type;
    //       const date = this.myForm.value.date;
    //       const file = this.myForm.value.file;

    //       const nuevaFila = {
    //         name: name,
    //         type: type,
    //         date: date,
    //         file: file
    //       };


    //       this.nuevaFila.push(nuevaFila);


    //       this.nuevaFilaEvent.emit(this.nuevaFila);

    //       this.agregarFila();



    //       this.dialogRef.close();
    //     }
    //   }
    // });
    if (this.myForm.invalid) {
      this.toastrSvc.warning('Complete la información.', '');
      return Object.values(this.myForm.controls).forEach((control) => {
        control.markAllAsTouched();

      });
    }
    if(this.nuevaFila.url!=null){
      this.toastrSvc.success('Documento creado exitosamente.', '');
      this.dialogRef.close(this.nuevaFila,);

    }else{
      this.toastrSvc.error(`Debe seleccionar un documento.`);
    }
    
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      type: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      expeditionDate: ['', Validators.required],
      file: ['', Validators.required],
    });
    this.fillForm();
  }
  
  fillForm(){
    this.myForm.patchValue({type:this.s})
  }
  get nameInvalid() {
    return this.myForm.get('name')?.invalid && this.myForm.get('name')?.touched;
  }
  get expeditionDateInvalid() {
    return this.myForm.get('expeditionDate')?.invalid && this.myForm.get('expeditionDate')?.touched;
  }
  get fileInvalid() {
   if (this.selectedFile && this.selectedFile.type === 'application/pdf') {
      this.myForm.get('file')?.setErrors(null);
      return this.myForm.get('file')?.invalid && this.myForm.get('file')?.touched;
    } else {
      console.log('Archivo inválido. Se requiere un archivo PDF.');
      this.myForm.get('file')?.setErrors({ 'invalid': true })
      return true ;
    } 
  }
  fillDocument(){
    this.nuevaFila.name=this.myForm.value.name;
    this.nuevaFila.url=this.pdfUrl;
    this.nuevaFila.type=this.s;
    this.nuevaFila.expeditionDate=new Date(this.myForm.value.expeditionDate);
    this.nuevaFila.consecutive=0;
    this.nuevaFila.ordering=1;
    this.nuevaFila.isException=false;
    this.nuevaFila.createUser="dacoes"
    this.nuevaFila.description="documents";
    //console.log(this.nuevaFila)
  }

  onFileSelected(event: any) {
    this.selectedFile = (event.target as HTMLInputElement).files?.[0];
    this.UrlD=event.target.files[0].name;
    console.log(this.UrlD);
    if (this.selectedFile) {
      this.pdfUrl = URL.createObjectURL(this.selectedFile);
      console.log(this.pdfUrl)
    }

    this.fillDocument();
  }

}



@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animation.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimation {
  constructor(public dialogRef: MatDialogRef<DialogAnimation>, private filaService: FilaService) { }

}
