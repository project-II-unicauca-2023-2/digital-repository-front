import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progreso-circular',
  templateUrl: './progreso-circular.component.html',
  styleUrls: ['./progreso-circular.component.css']
})
export class ProgresoCircularComponent {
  @Input() title: string="";
  @Input() score: number=0;
  @Input() scoreMax: number=0;
  @Input() color: string="";
  porcentaje: number = 0; // Declarar la propiedad porcentaje
  colorPrincipal=""
  colorSecundario=""
  // Lógica adicional de tu componente

  ngOnInit() {

    this.porcentaje = (this.score / this.scoreMax) * 100; // Calcular el porcentaje
    if (this.color=="azul"){
      this.colorPrincipal='#000066'
      this.colorSecundario='#f5d9d9'
    }else{      
      this.colorPrincipal='#9D0311'
      this.colorSecundario='#d9d9e8'
    }

      

  }
}
