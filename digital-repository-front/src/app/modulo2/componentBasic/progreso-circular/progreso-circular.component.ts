import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progreso-circular',
  templateUrl: './progreso-circular.component.html',
  styleUrls: ['./progreso-circular.component.css']
})
export class ProgresoCircularComponent  implements OnChanges{
  @Input() title: string="";
  @Input() score: number=0;
  @Input() scoreMax: number=0;
  @Input() color: string="";
  porcentaje: number = 0; // Declarar la propiedad porcentaje
  colorPrincipal=""
  colorSecundario=""
  // se queda escuchando por si hay un cambio de los valores y pueda actualizarse, esto por que son valores traidos de una peticion http
  ngOnChanges(changes: SimpleChanges): void {
   // Verificar si las propiedades de entrada relevantes han cambiado
   if (changes['score'] || changes['scoreMax'] || changes['color']) {
    this.calcularPorcentaje();
    }
  }
  private calcularPorcentaje(): void {
    this.porcentaje = parseFloat(((this.score / this.scoreMax) * 100).toFixed(1));
  }
  ngOnInit() {

    //this.porcentaje = (this.score / this.scoreMax) * 100; // Calcular el porcentaje
    if (this.color=="azul"){
      this.colorPrincipal='#000066'
      this.colorSecundario='#f5d9d9'
    }else{      
      this.colorPrincipal='#9D0311'
      this.colorSecundario='#d9d9e8'
    }

      

  }
}
