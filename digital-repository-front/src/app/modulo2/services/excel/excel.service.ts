import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Excel from 'exceljs';
import { datosAside } from '../../models/datosAside';
import { idContrato } from '../../models/idContrato';
import { totalCriteriaScore } from '../../models/totalCriteriaScore';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {
  rutaFormato = "assets/documentos/PA-GA-5-FOR-39.xlsx";
  casillaDefectoX="K15"
  diccionario: { [key: string]: string } = {
    '5.5-31.3/': 'J16',
    '5.5-31.6/': 'J17',
    '5.5-31.2/': 'J18',
    '5.5-31.5/': 'J19',
    '5.5-31.9/': 'J20',
    '5.5-31.1/': 'J22',
    '5.5-31.14/': 'J23',
    '5.5-31.15/': 'J24',
    '5.5-31.17/': 'J25',
    '5.5-31.4/': 'J26',
  };
  private workbook: Excel.Workbook;

  constructor(private http: HttpClient) {
    this.workbook = new Excel.Workbook();
  }

  async createNewExcel(numeroContrato:idContrato ,datos: datosAside, resultadosEvaluacion: totalCriteriaScore): Promise<void> {
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

        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; 
        const year = currentDate.getFullYear();
        const fechaFormato = `${day}/${month}/${year}`;
        // Establecer el valor de la celda C6 como la fecha formateada
        worksheet.getCell('C6').value = fechaFormato;
        worksheet.getCell('C8').value = numeroContrato.mascara+" del "+numeroContrato.anio;
        worksheet.getCell('C9').value = datos.name;
        worksheet.getCell('J9').value = datos.identification;
        worksheet.getCell('C10').value = datos.initialDate;
        worksheet.getCell('I10').value = datos.finalDate;
        worksheet.getCell('A11').value = worksheet.getCell('A11').value+ " "+datos.subject;
        worksheet.getCell('J47').value = resultadosEvaluacion.totalScore;

        let casillasCriterios:string[]=['C','G','J'];
        
        let casillasCriteriosName:string[]=['A','E','H'];
        for (let j:number=0 ;j<casillasCriterios.length;j++){
          worksheet.getCell(casillasCriterios[j]+'46').value     =resultadosEvaluacion.listaScoreCriteria[j].rate;
          worksheet.getCell(casillasCriteriosName[j]+'45').value =resultadosEvaluacion.listaScoreCriteria[j].name.toUpperCase();
        }
        let casillaX=this.buscarValor(numeroContrato.mascara)
        let valorX="x"
        console.log(casillaX=== this.casillaDefectoX+"-"+casillaX+" ,"+this.casillaDefectoX);
        if(casillaX=== this.casillaDefectoX){
          valorX="valor no considerado"
        }
        worksheet.getCell(casillaX).value=valorX;
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
  buscarValor(cadena: string): string  {
    for (const key in this.diccionario) {
      //console.log(key+" ppp "+(cadena)+"="+key.includes(cadena));
      if (cadena.includes(key)) {
        return this.diccionario[key];
      }
    }
    return this.casillaDefectoX;
  }
}