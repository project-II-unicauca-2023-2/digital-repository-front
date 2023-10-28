import { ElementRef, Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }
/***
 * recibe la tabla como referencia al html y la guarda 
 */
  generarPDFsDeTabla(tablas: ElementRef[]): void {
    //alert("DESCARGANDO DE TABLAAA");
    if (tablas.length !== 0) {
      tablas.forEach((tabla: ElementRef, index: number) => {
        const doc = new jsPDF.default();
        const table = tabla.nativeElement;
        (doc as any).autoTable({ html: table });
        doc.save(`ej.pdf`);
      });
    }
  }
}