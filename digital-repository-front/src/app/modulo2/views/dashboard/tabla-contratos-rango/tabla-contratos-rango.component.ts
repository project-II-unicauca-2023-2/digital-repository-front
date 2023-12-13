import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectionType } from '@swimlane/ngx-datatable';
import { userData } from 'src/app/modulo2/models/userData';
import { CriptoService } from 'src/app/modulo2/services/cripto/cripto.service';
import { DasboardService } from 'src/app/services/dasboard.service';
import { VendorService } from 'src/app/services/vendor.service';
interface interfaceContrato { /**se pone como interfaz para poder recibir se planea eliminar cuando el back lo retorne con el nombre de vatiables ya establecidas  */
  idContrato: number;
  mask: string;
  year: number;
}
export enum ColumnMode {
  standard = 'standard',
  flex = 'flex',
  force = 'force'
}

interface UserData {
  nombre: string;
  id: string;
  contratosAnio: number;
  contratosPromedioAnio: number;
  contratosTotales: number;
  contratosPromedioTotal: number;
 }
@Component({
  selector: 'app-tabla-contratos-rango',
  templateUrl: './tabla-contratos-rango.component.html',
  styleUrls: ['./tabla-contratos-rango.component.css']
})
export class TablaContratosRangoComponent implements OnInit {
  datosRecuperados:userData[]=[];
  nombreContrato:string[][]=[];
  
   soloIds!:string[][];
  /***********************************************
  DATOS:UserData[]=[
    {
      "nombre": "Ethel Price",
      "id": "1",
      "contratosAnio": 45,
      "contratosPromedioAnio": 3.8,
      "contratosTotales": 120,
      "contratosPromedioTotal": 4.2
    },
    {
      "nombre": "Claudine Neal",
      "id": "2",
      "contratosAnio": 28,
      "contratosPromedioAnio": 2.4,
      "contratosTotales": 85,
      "contratosPromedioTotal": 3.1
    },
    {
      "nombre": "Beryl Rice",
      "id": "3",
      "contratosAnio": 34,
      "contratosPromedioAnio": 3.5,
      "contratosTotales": 110,
      "contratosPromedioTotal": 4.0
    },  {
      "nombre": "Georgina Schultz",
      "id": "5",
      "contratosAnio": 40,
      "contratosPromedioAnio": 3.2,
      "contratosTotales": 95,
      "contratosPromedioTotal": 3.9
    },
    {
      "nombre": "Carroll Buchanan",
      "id": "6",
      "contratosAnio": 18,
      "contratosPromedioAnio": 1.9,
      "contratosTotales": 75,
      "contratosPromedioTotal": 3.7
    },
    {
      "nombre": "Valarie Atkinson",
      "id": "7",
      "contratosAnio": 25,
      "contratosPromedioAnio": 2.7,
      "contratosTotales": 82,
      "contratosPromedioTotal": 3.3
    },
    {
      "nombre": "Schroeder Mathews",
      "id": "8",
      "contratosAnio": 30,
      "contratosPromedioAnio": 3.0,
      "contratosTotales": 105,
      "contratosPromedioTotal": 4.1
    },
    {
      "nombre": "Lynda Mendoza",
      "id": "9",
      "contratosAnio": 15,
      "contratosPromedioAnio": 1.5,
      "contratosTotales": 88,
      "contratosPromedioTotal": 3.6
    },
    {
      "nombre": "Sarah Massey",
      "id": "10",
      "contratosAnio": 22,
      "contratosPromedioAnio": 2.2,
      "contratosTotales": 92,
      "contratosPromedioTotal": 3.2
    }, {
      "nombre": "Evans Hickman",
      "id": "11",
      "contratosAnio": 12,
      "contratosPromedioAnio": 1.2,
      "contratosTotales": 70,
      "contratosPromedioTotal": 3.1
    },
    {
      "nombre": "Dawson Barber",
      "id": "12",
      "contratosAnio": 28,
      "contratosPromedioAnio": 2.8,
      "contratosTotales": 98,
      "contratosPromedioTotal": 3.5
    },
    {
      "nombre": "Bruce Strong",
      "id": "13",
      "contratosAnio": 20,
      "contratosPromedioAnio": 2.0,
      "contratosTotales": 80,
      "contratosPromedioTotal": 4.0
    },
    {
      "nombre": "Nellie Whitfield",
      "id": "14",
      "contratosAnio": 35,
      "contratosPromedioAnio": 3.5,
      "contratosTotales": 105,
      "contratosPromedioTotal": 4.2
    },
    {
      "nombre": "Jackson Macias",
      "id": "15",
      "contratosAnio": 15,
      "contratosPromedioAnio": 1.5,
      "contratosTotales": 85,
      "contratosPromedioTotal": 3.8
    },
    {
      "nombre": "Pena Pena",
      "id": "16",
      "contratosAnio": 25,
      "contratosPromedioAnio": 2.5,
      "contratosTotales": 95,
      "contratosPromedioTotal": 3.7
    },
    {
      "nombre": "Lelia Gates",
      "id": "17",
      "contratosAnio": 18,
      "contratosPromedioAnio": 1.8,
      "contratosTotales": 88,
      "contratosPromedioTotal": 3.1
    },
    {
      "nombre": "Letitia Vasquez",
      "id": "18",
      "contratosAnio": 28,
      "contratosPromedioAnio": 2.8,
      "contratosTotales": 92,
      "contratosPromedioTotal": 3.2
    },
    {
      "nombre": "Trevino Moreno",
      "id": "19",
      "contratosAnio": 32,
      "contratosPromedioAnio": 3.2,
      "contratosTotales": 100,
      "contratosPromedioTotal": 3.9
    },
    {
      "nombre": "Barr Page",
      "id": "20",
      "contratosAnio": 16,
      "contratosPromedioAnio": 1.6,
      "contratosTotales": 78,
      "contratosPromedioTotal": 3.4
    }, {
      "nombre": "Kirkland Merrill",
      "id": "21",
      "contratosAnio": 26,
      "contratosPromedioAnio": 2.6,
      "contratosTotales": 86,
      "contratosPromedioTotal": 3.3
    },
    {
      "nombre": "Blanche Conley",
      "id": "22",
      "contratosAnio": 19,
      "contratosPromedioAnio": 1.9,
      "contratosTotales": 89,
      "contratosPromedioTotal": 3.6
    },
    {
      "nombre": "Atkins Dunlap",
      "id": "23",
      "contratosAnio": 31,
      "contratosPromedioAnio": 3.1,
      "contratosTotales": 101,
      "contratosPromedioTotal": 4.1
    },
    {
      "nombre": "Everett Foreman",
      "id": "24",
      "contratosAnio": 21,
      "contratosPromedioAnio": 2.1,
      "contratosTotales": 81,
      "contratosPromedioTotal": 3.2
    },
    {
      "nombre": "Gould Randolph",
      "id": "25",
      "contratosAnio": 29,
      "contratosPromedioAnio": 2.9,
      "contratosTotales": 99,
      "contratosPromedioTotal": 3.5
    },
    {
      "nombre": "Kelli Leon",
      "id": "26",
      "contratosAnio": 23,
      "contratosPromedioAnio": 2.3,
      "contratosTotales": 93,
      "contratosPromedioTotal": 3.3
    },
    {
      "nombre": "Freda Mason",
      "id": "27",
      "contratosAnio": 14,
      "contratosPromedioAnio": 1.4,
      "contratosTotales": 84,
      "contratosPromedioTotal": 3.7
    },
    {
      "nombre": "Tucker Maxwell",
      "id": "28",
      "contratosAnio": 24,
      "contratosPromedioAnio": 2.4,
      "contratosTotales": 94,
      "contratosPromedioTotal": 3.8
    },
    {
      "nombre": "Yvonne Parsons",
      "id": "29",
      "contratosAnio": 30,
      "contratosPromedioAnio": 3.0,
      "contratosTotales": 100,
      "contratosPromedioTotal": 3.9
    },
    {
      "nombre": "Woods Key",
      "id": "30",
      "contratosAnio": 17,
      "contratosPromedioAnio": 1.7,
      "contratosTotales": 87,
      "contratosPromedioTotal": 3.4
    },
    {
      "nombre": "Stephens Reilly",
      "id": "31",
      "contratosAnio": 27,
      "contratosPromedioAnio": 2.7,
      "contratosTotales": 97,
      "contratosPromedioTotal": 3.6
    },
    {
      "nombre": "Mcfarland Sparks",
      "id": "32",
      "contratosAnio": 25,
      "contratosPromedioAnio": 2.5,
      "contratosTotales": 95,
      "contratosPromedioTotal": 3.7
    },
    {
      "nombre": "Jocelyn Sawyer",
      "id": "33",
      "contratosAnio": 34,
      "contratosPromedioAnio": 3.4,
      "contratosTotales": 104,
      "contratosPromedioTotal": 4.0
    },
    {
      "nombre": "Renee Barr",
      "id": "34",
      "contratosAnio": 16,
      "contratosPromedioAnio": 1.6,
      "contratosTotales": 86,
      "contratosPromedioTotal": 3.2
    },
    {
      "nombre": "Gaines Beck",
      "id": "35",
      "contratosAnio": 22,
      "contratosPromedioAnio": 2.2,
      "contratosTotales": 92,
      "contratosPromedioTotal": 3.3
    }
  ]*/
    editing = {};
    rows: UserData[] = [];
    anioTitulo!:string;
    ColumnMode = ColumnMode;
    selected = [];
    SelectionType = SelectionType;

    constructor(private route: ActivatedRoute ,
       private encripta:CriptoService,
       private servicioVendor:VendorService,
       private dashboardService:DasboardService){
      //this.rows = [...this.DATOS];
      
    }
    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        const parametrosCodificados = params['iD'];
        this.anioTitulo = params['anio'];
        //alert("anio es"+this.anioTitulo)
        if (parametrosCodificados) {
          const valoresDecodificados = this.encripta.decryptArray(parametrosCodificados,"unicauca#1927");
          const arregloDeNumeros: number[] = valoresDecodificados.map(str => parseInt(str, 10));

          console.log("Valores pasados url: "+arregloDeNumeros); // Obtendrás los valores originales
          this.servicioVendor.getScoreVendors(arregloDeNumeros,this.anioTitulo).subscribe((datos: userData[]) => {
            console.log("mis D"+JSON.stringify(datos[0]));
            this.datosRecuperados=datos;
            this.soloIds= this.datosRecuperados.map((vendor) => vendor.idsContract);
            console.log(this.soloIds);
            let variableMostrarTodos:string[][]=[]; 
            this.soloIds.forEach((element, index) => {//recorre la lista de ids 
              // Tu lógica aquí
          
              this.dashboardService.getContratosPorIds(element).subscribe(///recupero los nombres de mascaras por cada lista
                  (data: interfaceContrato[]) => {
                     // console.log("Iteración #" + index + ": Habeis recuperado" + JSON.stringify(data));
                      // Resto de tu lógica
                      let variableMostrar:string[]=[];
                      data.forEach(dato => {
                        if(dato){
                          let cadena=dato.mask+" del "+dato.year+"\n";
                          console.log("Iteración #" + index+" "+cadena);
                          variableMostrar.push(cadena);
                        }
                      });
                      console.log("almacenado "+variableMostrar);
                      variableMostrarTodos.push(variableMostrar);
                      this.datosRecuperados[index].idsContract=variableMostrar;
                      console.log("almacenado todo "+JSON.stringify(variableMostrarTodos));
                  },
                  (error) => {
                      console.error('Iteración #' + index + ': Ocurrió un error al obtener promedio de servicios:', error);
                  }
              );
          });
            
            /*this.datosRecuperados.forEach((item, index) => {
              if (this.nombreContrato[index] && this.nombreContrato[index].length === item.idsContract.length) {
                item.idsContract = this.nombreContrato[index];
              }
            });*/
          });
        }
      });;
    } 
    
 
    
  onSelect( selected :any) {
    alert("redireccion con valores:"+JSON.stringify(selected.selected[0]));
  }

  onActivate(event:any) {
    console.log('Activate Event', event.row);
  }
   sacarNombres(areglo:string[]):string[]{
    //alert("e"+areglo);
    let nombres:string[]=[];
    areglo.forEach(element => {
      nombres.push("a");
    });
    //alert("s"+nombres);
    return nombres;
   }
   
   funcion(value:string[]):string{
    return"Hola";
   }
}
