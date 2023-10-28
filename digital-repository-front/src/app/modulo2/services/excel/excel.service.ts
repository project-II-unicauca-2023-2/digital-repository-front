import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  ruta = '../../../../assets/documentos/hola.xlsx';


  constructor() { }
  checkFilePermissions(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
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
        .catch(error => {
          resolve(false);
        });
    });
  }
  
  /**
   * crea nuevo excel es para ver si funciona la biblioteca
   */
  async createNewExcel() {
      let fecha="30-06-2023"
      try {
          const hasPermissions = await this.checkFilePermissions(this.ruta);
          console.log(hasPermissions ? 'Ruta válida' : 'Ruta inválida');
          if (hasPermissions) {
              alert("permisos obtenidos: " + hasPermissions);
  
              // Crea un libro de trabajo vacío
              const workbook = XLSX.utils.book_new();
              const sheetName = "Sheet1";
              const worksheetData = [];
              const numRows = 52;
              const numCols = 10;
              
              for (let i = 0; i < numRows; i++) {
                const row = [];
                for (let j = 0; j < numCols; j++) {
                  // Agregar los valores
                  //row.push(`{ r: ${i}, c: ${j} } -`);
                  row.push(`_`);
                }
                worksheetData.push(row);
              }
              
              
              const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            //LLENAR INFO
            worksheet[XLSX.utils.encode_cell( { r: 0, c: 2 })] = { t: 's', v: 'Proceso de Apoyo\n Apoyo Administrativo\n Evaluación de Proveedores'};
            worksheet[XLSX.utils.encode_cell( { r: 3, c: 0 })] = { t: 's', v: 'Código: PA-GA-5-FOR-39' };
            worksheet[XLSX.utils.encode_cell( { r: 3, c: 3 })] = { t: 's', v: 'Versión: 2' };
            worksheet[XLSX.utils.encode_cell( { r: 3, c: 7 })] = { t: 's', v: 'Fecha de Actualización: '+fecha };
            worksheet[XLSX.utils.encode_cell( { r: 5, c: 0 })] = { t: 's', v: 'Fecha de evaluación:' };
            worksheet[XLSX.utils.encode_cell( { r: 6, c: 0 })] = { t: 's', v: 'INFORMACIÓN DEL CONTRATO' };
            worksheet[XLSX.utils.encode_cell( { r: 7, c: 0 })] = { t: 's', v: 'Número y Fecha: ' };
            worksheet[XLSX.utils.encode_cell( { r: 8, c: 0 })] = { t: 's', v: 'Nombre del Proveedor o contratista: ' };
            worksheet[XLSX.utils.encode_cell( { r: 8, c: 7 })] = { t: 's', v: 'c.c' };
            worksheet[XLSX.utils.encode_cell( { r: 9, c: 0 })] = { t: 's', v: 'Fecha de inicio:' };
            worksheet[XLSX.utils.encode_cell( { r: 9, c: 6 })] = { t: 's', v: 'Fecha de terminación:' };
            worksheet[XLSX.utils.encode_cell( { r: 10, c: 0 })] = { t: 's', v: 'Objeto del contrato:' };
            worksheet[XLSX.utils.encode_cell( { r: 14, c: 0 })] = { t: 's', v: 'SELECCIONE (X) EL TIPO DE PROVEEDOR ' };
            worksheet[XLSX.utils.encode_cell( { c: 15, r: 0 })] = { t: 's', v: 'BIENES' };
            worksheet[XLSX.utils.encode_cell( { c: 18, r: 0 })] = { t: 's', v: 'SERVICIOS' };
            worksheet[XLSX.utils.encode_cell( { c: 25, r: 0 })] = { t: 's', v: 'OBRAS' };
            worksheet[XLSX.utils.encode_cell( { r: 15, c: 4 })] = { t: 's', v: '1. Por contrato de Compraventa' };
            worksheet[XLSX.utils.encode_cell( { r: 16, c: 4 })] = { t: 's', v: '2. Por contrato de Suministro' };
            worksheet[XLSX.utils.encode_cell( { r: 17, c: 4 })] = { t: 's', v: '3. Por contrato de Órdenes de Compra' };
            worksheet[XLSX.utils.encode_cell( { r: 18, c: 4 })] = { t: 's', v: '1. Por contrato de Prestación de servicios' };
            worksheet[XLSX.utils.encode_cell( { r: 19, c: 4 })] = { t: 's', v: '2. Por contrato de Consultoría' };
            worksheet[XLSX.utils.encode_cell( { r: 20, c: 4 })] = { t: 's', v: '3. Por contrato de Suministro' };
            worksheet[XLSX.utils.encode_cell( { r: 21, c: 4 })] = { t: 's', v: '4. Por contrato de Arrendamiento' };
            worksheet[XLSX.utils.encode_cell( { r: 22, c: 4 })] = { t: 's', v: '5. Por contrato de Pasantía' };
            worksheet[XLSX.utils.encode_cell( { r: 23, c: 4 })] = { t: 's', v: '6. Por contrato de Judicatura' };
            worksheet[XLSX.utils.encode_cell( { r: 24, c: 4 })] = { t: 's', v: '7. Por contrato de Aprendizaje' };
            worksheet[XLSX.utils.encode_cell( { r: 25, c: 4 })] = { t: 's', v: '1. Por Contrato de Obra' };
            worksheet[XLSX.utils.encode_cell( { r: 26, c: 0 })] = { t: 's', v: 'CRITERIOS PARA LA CALIFICACIÓN DE PROVEEDORES' };
            worksheet[XLSX.utils.encode_cell( { r: 27, c: 0 })] = { t: 's', v: 'Se evaluará teniendo en cuenta los criterios de Calidad, Ejecución y cumplimiento' };
            worksheet[XLSX.utils.encode_cell( { r: 28, c: 0 })] = { t: 's', v: 'CRITERIOS' };
            worksheet[XLSX.utils.encode_cell( { r: 15, c: 0 })] = { t: 's', v: 'PROVEEDOR DE BIENES' };
            worksheet[XLSX.utils.encode_cell( { r: 18, c: 0 })] = { t: 's', v: 'PROVEEDOR DE SERVICIOS' };
            worksheet[XLSX.utils.encode_cell( { r: 25, c: 0 })] = { t: 's', v: 'PROVEEDOR DE OBRAS' };
            worksheet[XLSX.utils.encode_cell( { r: 28, c: 1 })] = { t: 's', v: 'PROVEEDOR DE BIENES' };
            worksheet[XLSX.utils.encode_cell( { r: 32, c: 1 })] = { t: 's', v: 'PROVEEDOR DE SERVICIOS' };
            worksheet[XLSX.utils.encode_cell( { r: 36, c: 1 })] = { t: 's', v: 'PROVEEDOR DE OBRAS' };
            worksheet[XLSX.utils.encode_cell( { r: 29, c: 0 })] = { t: 's', v: 'CALIDAD' };
            worksheet[XLSX.utils.encode_cell( { r: 30, c: 0 })] = { t: 's', v: 'EJECUCIÓN' };
            worksheet[XLSX.utils.encode_cell( { r: 31, c: 0 })] = { t: 's', v: 'CUMPLIMIENTO' };
            worksheet[XLSX.utils.encode_cell( { r: 33, c: 0 })] = { t: 's', v: 'CALIDAD' };
            worksheet[XLSX.utils.encode_cell( { r: 34, c: 0 })] = { t: 's', v: 'EJECUCIÓN' };
            worksheet[XLSX.utils.encode_cell( { r: 35, c: 0 })] = { t: 's', v: 'CUMPLIMIENTO' };
            worksheet[XLSX.utils.encode_cell( { r: 37, c: 0 })] = { t: 's', v: 'CALIDAD' };
            worksheet[XLSX.utils.encode_cell( { r: 38, c: 0 })] = { t: 's', v: 'EJECUCIÓN' };
            worksheet[XLSX.utils.encode_cell( { r: 39, c: 0 })] = { t: 's', v: 'CUMPLIMIENTO' };
            worksheet[XLSX.utils.encode_cell( { r: 29, c: 1 })] = { t: 's', v: 'Cumplimiento con las especificaciones técnicas pactadas y servicio post-venta.' };
            worksheet[XLSX.utils.encode_cell( { r: 30, c: 1 })] = { t: 's', v: 'Entrega de los bienes contratados dentro del tiempo establecido y los documentos que sean requeridos.' };
            worksheet[XLSX.utils.encode_cell( { r: 31, c: 1 })] = { t: 's', v: 'Respuesta a documentación solicitada; documentos precontractuales, contractual y post-contractual.' };
            worksheet[XLSX.utils.encode_cell( { r: 33, c: 1 })] = { t: 's', v: 'Percepción que se tiene de satisfacción, grado de eficiencia o rendimiento del servicio.' };
            worksheet[XLSX.utils.encode_cell( { r: 34, c: 1 })] = { t: 's', v: 'Cumplimiento de las actividades del contrato, satisfacción del servicio contratado, el cual cumplió con todas las especificaciones y normas técnicas.' };
            worksheet[XLSX.utils.encode_cell( { r: 35, c: 1 })] = { t: 's', v: 'Cumplimiento en los tiempos de entrega de las actividades del servicio, finalización en el tiempo pactado y obtención de la documentación en el momento y lugar adecuado.' };
            worksheet[XLSX.utils.encode_cell( { r: 37, c: 1 })] = { t: 's', v: 'Cumplimiento en todas las especificaciones del proyecto de ejecución de la obra, así como las adecuadas condiciones de calidad y la normatividad de aplicación.' };
            worksheet[XLSX.utils.encode_cell( { r: 38, c: 1 })] = { t: 's', v: 'Construcción de la obra de acuerdo con lo previsto en el proyecto, alcanzando el objeto y la meta física contractual, garantizando funcionalidad.' };
            worksheet[XLSX.utils.encode_cell( { r: 39, c: 1 })] = { t: 's', v: 'Cumplimiento en los tiempos de entrega de la obra, finalización de la obra en el tiempo pactado y entrega oportuna de la documentación técnica, legal y administrativa previo a la liquidación.' };
            worksheet[XLSX.utils.encode_cell( { r: 40, c: 0 })] = { t: 's', v: 'ESCALA DE CALIFICACIÓN' };
            worksheet[XLSX.utils.encode_cell( { r: 41, c: 0 })] = { t: 's', v: 'La escala de calificación para evaluar a los proveedores será de 1 a 5 donde 1 es el valor más bajo y 5 el valor más alto' };
            worksheet[XLSX.utils.encode_cell( { r: 42, c: 0 })] = { t: 's', v: 'ESCALA' };
            worksheet[XLSX.utils.encode_cell( { r: 42, c: 1 })] = { t: 's', v: '1= no cumple' };
            worksheet[XLSX.utils.encode_cell( { r: 42, c: 3 })] = { t: 's', v: '2= cumple minimamente' };
            worksheet[XLSX.utils.encode_cell( { r: 42, c: 5 })] = { t: 's', v: '3= Cumple Parcialmente' };
            worksheet[XLSX.utils.encode_cell( { r: 42, c: 7 })] = { t: 's', v: '4= Cumple Plenamente' };
            worksheet[XLSX.utils.encode_cell( { r: 42, c: 9 })] = { t: 's', v: '5= Supera Espectativas' };
            worksheet[XLSX.utils.encode_cell( { r: 43, c: 0 })] = { t: 's', v: 'CALIFICACIÓN AL PROVEEDOR' };
            worksheet[XLSX.utils.encode_cell( { r: 44, c: 0 })] = { t: 's', v: 'CRITERIOS DE CALIDAD' };
            worksheet[XLSX.utils.encode_cell( { r: 44, c: 4 })] = { t: 's', v: 'CRITERIOS DE CUMPLIMIENTO' };
            worksheet[XLSX.utils.encode_cell( { r: 44, c: 7 })] = { t: 's', v: 'CRITERIOS DE EJECUCION' };
            worksheet[XLSX.utils.encode_cell( { r: 44, c: 2 })] = { t: 's', v: 'Puntaje' };
            worksheet[XLSX.utils.encode_cell( { r: 44, c: 6 })] = { t: 's', v: 'Puntaje' };
            worksheet[XLSX.utils.encode_cell( { r: 44, c: 9 })] = { t: 's', v: 'Puntaje' };
            worksheet[XLSX.utils.encode_cell( { r: 46, c: 0 })] = { t: 's', v: 'EVALUACION TOTAL' };
            worksheet[XLSX.utils.encode_cell( { r: 47, c: 0 })] = { t: 's', v: 'ESTE FORMATO DEBERÁ ENVIARSE AL CORREO ELECTRÓNICO:  evaluproveedores@unicauca.edu.co' };
            worksheet[XLSX.utils.encode_cell( { r: 48, c: 0 })] = { t: 's', v: 'Nombre completo del supervisor ' };
            worksheet[XLSX.utils.encode_cell( { r: 48, c: 4 })] = { t: 's', v: 'Firma de Supervisor' };
            worksheet[XLSX.utils.encode_cell( { r: 48, c: 7 })] = { t: 's', v: 'Firma del contratista' };
            worksheet[XLSX.utils.encode_cell( { r: 50, c: 0 })] = { t: 's', v: 'APLICA SOLO PARA ORDENES DE COMPRA' };
            worksheet[XLSX.utils.encode_cell( { r: 51, c: 6 })] = { t: 's', v: 'firma' };
            worksheet[XLSX.utils.encode_cell( { r: 51, c: 0 })] = { t: 's', v: 'Nombre completo profesional Especializado del Área de Adquisiciones e' };
           

              // Fusiona las celdas de la primera fila
              const merges = [{ s: { r: 0, c: 0 }, e: { r: 2, c: 1 } },   { s: { r: 0, c: 2 }, e: { r: 2, c: 9 } }, //titulo
              { s: { r: 3, c: 0 }, e: { r: 3, c: 2 } },{ s: { r: 3, c: 3 }, e: { r: 3, c: 6 } },{ s: { r: 3, c: 7 }, e: { r: 3, c: 9 } },
              { s:{ r: 4, c: 0 } , e: { r: 4, c: 9 }  },
              { s:{ r: 5, c: 0 } , e: { r: 5, c: 1 }  }, { s: { r: 5, c: 2 } , e: { r: 5, c: 9 } }, 
              { s:{ r: 6, c: 0 } , e: { r: 6, c: 9 }  },
              { s:{ r: 7, c: 0 } , e: { r: 7, c: 1 }  }, { s: { r: 7, c: 2 } , e: { r: 7, c: 9 } }, 
              { s:{ r: 8, c: 0 } , e: { r: 8, c: 1 }  }, { s: { r: 8, c: 2 } , e: { r: 8, c: 6 } },  { s: { r: 8, c: 7 } , e: { r: 8, c: 8 } }, 
              { s:{ r: 9, c: 0 } , e: { r: 9, c: 1 }  }, { s: { r: 9, c: 2 } , e: { r: 9, c: 5 } },  { s: { r: 9, c: 6 } , e: { r: 9, c: 7 } },{ s: { r: 9, c: 8 } , e: { r: 9, c: 9 } },
              { s:{ r: 10, c: 0 } , e: { r: 13, c: 9 }  },
              { s:{ r: 14, c: 0 } , e: { r: 14, c: 9 }  },
              { s:{ r: 15, c: 0 } , e: { r: 17, c: 3 }  },
              { s:{ r: 15, c: 4 } , e: { r: 15, c: 7 }  }, { s:{ r: 15, c: 8 } , e: { r: 15, c: 9 }  },
              { s:{ r: 16, c: 4 } , e: { r: 16, c: 7 }  }, { s:{ r: 16, c: 8 } , e: { r: 16, c: 9 }  },
              { s:{ r: 17, c: 4 } , e: { r: 17, c: 7 }  }, { s:{ r: 17, c: 8 } , e: { r: 17, c: 9 }  },
              { s:{ r: 18, c: 0 } , e: { r: 24, c: 3 }  },              
              { s:{ r: 18, c: 4 } , e: { r: 18, c: 7 }  }, { s:{ r: 18, c: 8 } , e: { r: 18, c: 9 }  },
              { s:{ r: 19, c: 4 } , e: { r: 19, c: 7 }  }, { s:{ r: 19, c: 8 } , e: { r: 19, c: 9 }  },
              { s:{ r: 20, c: 4 } , e: { r: 20, c: 7 }  }, { s:{ r: 20, c: 8 } , e: { r: 20, c: 9 }  },
              { s:{ r: 21, c: 4 } , e: { r: 21, c: 7 }  }, { s:{ r: 21, c: 8 } , e: { r: 21, c: 9 }  },
              { s:{ r: 22, c: 4 } , e: { r: 22, c: 7 }  }, { s:{ r: 22, c: 8 } , e: { r: 22, c: 9 }  },
              { s:{ r: 23, c: 4 } , e: { r: 23, c: 7 }  }, { s:{ r: 23, c: 8 } , e: { r: 23, c: 9 }  },
              { s:{ r: 24, c: 4 } , e: { r: 24, c: 7 }  }, { s:{ r: 24, c: 8 } , e: { r: 24, c: 9 }  },
              { s:{ r: 25, c: 0 } , e: { r: 25, c: 3 }  },
              { s:{ r: 25, c: 4 } , e: { r: 25, c: 7 }  }, { s:{ r: 25, c: 8 } , e: { r: 25, c: 9 }  },
              { s:{ r: 26, c: 0 } , e: { r: 26, c: 9 }  },
              { s:{ r: 27, c: 0 } , e: { r: 27, c: 9 }  },
              { s:{ r: 28, c: 1 } , e: { r: 28, c: 9 }  },
              { s:{ r: 29, c: 1 } , e: { r: 29, c: 9 }  },
              { s:{ r: 30, c: 1 } , e: { r: 30, c: 9 }  },
              { s:{ r: 31, c: 1 } , e: { r: 31, c: 9 }  },
              { s:{ r: 32, c: 1 } , e: { r: 32, c: 9 }  },
              { s:{ r: 33, c: 1 } , e: { r: 33, c: 9 }  },
              { s:{ r: 34, c: 1 } , e: { r: 34, c: 9 }  },
              { s:{ r: 35, c: 1 } , e: { r: 35, c: 9 }  },
              { s:{ r: 36, c: 1 } , e: { r: 36, c: 9 }  },
              { s:{ r: 37, c: 1 } , e: { r: 37, c: 9 }  },
              { s:{ r: 38, c: 1 } , e: { r: 38, c: 9 }  },
              { s:{ r: 39, c: 1 } , e: { r: 39, c: 9 }  },
              { s:{ r: 40, c: 0 } , e: { r: 40, c: 9 }  },
              { s:{ r: 41, c: 0 } , e: { r: 41, c: 9 }  },
              { s:{ r: 42, c: 1 } , e: { r: 42, c: 2 }  },{ s:{ r: 42, c: 3 } , e: { r: 42, c: 4 }  },{ s:{ r: 42, c: 5 } , e: { r: 42, c: 6 }  },{ s:{ r: 42, c: 7 } , e: { r: 42, c: 8 }  },
              { s:{ r: 43, c: 0 } , e: { r: 43, c: 9 }  },
              { s:{ r: 45, c: 2 } , e: { r: 45, c: 3 }  },{ s:{ r: 44, c: 2 } , e: { r: 44, c: 3 }  },
              { s:{ r: 44, c: 0 } , e: { r: 45, c: 1 }  },{ s:{ r: 44, c: 4 } , e: { r: 45, c: 5 }  },{ s:{ r: 44, c: 7 } , e: { r: 45, c: 8 }  },
              { s:{ r: 46, c: 0 } , e: { r: 46, c: 6 }  },{ s:{ r: 46, c: 7 } , e: { r: 46, c: 9 }  },
              { s:{ r: 47, c: 0 } , e: { r: 47, c: 9 }  },
              { s:{ r: 48, c: 0 } , e: { r: 49, c: 0 }  },              
              { s:{ r: 48, c: 1 } , e: { r: 49, c: 3 }  },             
              { s:{ r: 48, c: 4 } , e: { r: 49, c: 4 }  },            
              { s:{ r: 48, c: 5 } , e: { r: 49, c: 6 }  },            
              { s:{ r: 48, c: 7 } , e: { r: 49, c: 9 }  },            
              { s:{ r: 50, c: 0 } , e: { r: 50, c: 9 }  },            
              { s:{ r: 51, c: 0 } , e: { r: 53, c: 1 }  },{ s:{ r: 51, c: 2 } , e: { r: 53, c: 5 }  },{ s:{ r: 51, c: 6 } , e: { r: 53, c: 9 }  }
            ] 
              if (!worksheet['!merges']) worksheet['!merges'] = [];
              merges.forEach(merge => worksheet['!merges']!.push(merge)); //  '!' indica que no es nulo ni indefinido
  
              XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);  
              
             
              // Genera el archivo con los cambios
              const wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
              const wbout = XLSX.write(workbook, wopts);
  
              // Crea un blob y un enlace para la descarga
              const blob = new Blob([wbout], { type: 'application/octet-stream' });
              const url = window.URL.createObjectURL(blob);
  
              // Crea un enlace y haz clic en él para iniciar la descarga
              const a = document.createElement('a');
              a.href = url;
              a.download = 'nuevo_archivo.xlsx';
              a.click();
              window.URL.revokeObjectURL(url);
          } else {
              console.log('No se tienen los permisos necesarios para acceder al archivo.');
          }
      } catch (error) {
          console.error('Error al leer o escribir en el archivo Excel', error);
      }
      
  }
  /**
   * se internta acceder a un excel que esta en assets
   */
  async replaceCellsInExcel() {
    try {
      const hasPermissions = await this.checkFilePermissions(this.ruta);
      if (hasPermissions) {
        console.log("va a leer");
        
        const workbook = XLSX.readFile(this.ruta);
        console.log("leer");
        const sheetName = workbook.SheetNames[0]; // Obtén el nombre de la primera hoja
        const worksheet = workbook.Sheets[sheetName]; // Obtén la hoja por su nombre

        // Reemplaza los valores en las celdas específicas
        worksheet['A7'].v = 'Nuevo valor para A7';
        worksheet['B5'].v = 'Nuevo valor para B5';

        // Genera el archivo con los cambios
        const wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
        const wbout = XLSX.write(workbook, wopts);

        // Crea un blob y un enlace para la descarga
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);

        // Crea un enlace y haz clic en él para iniciar la descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = 'archivo_modificado.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.log('No se tienen los permisos necesarios para acceder al archivo.');
      }
    } catch (error) {
      console.error('Error al leer o escribir en el archivo Excel', error);
    }
  }
}
