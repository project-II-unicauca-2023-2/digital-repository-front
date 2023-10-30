import { Injectable } from '@angular/core';
import * as Excel from 'exceljs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {
  rutaFormato = "assets/documentos/PA-GA-5-FOR-39.xlsx";
  private workbook: Excel.Workbook;

  constructor(private http: HttpClient) {
    this.workbook = new Excel.Workbook();
  }

  async createNewExcel(): Promise<void> {
    try {
      // Verificar los permisos del archivo base
      const hasPermissions = await this.checkFilePermissions(this.rutaFormato);
      if (!hasPermissions) {
        throw new Error('No se pudo acceder al archivo base.');
      }

      // Leer el archivo base
      const data = await this.http.get(this.rutaFormato, { responseType: 'arraybuffer' }).toPromise();
      if (data) {
        await this.workbook.xlsx.load(data); // Pasar los datos directamente a load
      } else {
        throw new Error('No se pudo cargar el archivo.');
      }

      let worksheet = this.workbook.getWorksheet(1);

      if (worksheet !== undefined) {
        // Leer celda por celda
        worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
          await row.eachCell({ includeEmpty: true }, async (cell, colNumber) => {
            //console.log('Cell ' + colNumber + ' = ' + cell.value);
          });
        });

        // Insertar valor en celda
        // worksheet.getCell('C6').value = 'Hello, World!';
        // worksheet.getCell('C8').value = 'Test';

        // Guardar la copia del archivo Excel
        const buffer = await this.workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      } else {
        throw new Error('No se pudo acceder a la hoja del archivo base.');
      }

    } catch (error) {
      console.error('Error al crear el nuevo archivo Excel:', error);
    }
  }

  private checkFilePermissions(filePath: string): Promise<boolean> {
    return new Promise((resolve) => {
      fetch(filePath)
        .then(response => response.blob())
        .then(blob => {
          const fileReader = new FileReader();
          fileReader.onloadend = () => {
            resolve(true);
          };
          fileReader.onerror = () => {
            resolve(false);
          };
          fileReader.readAsDataURL(blob);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
}