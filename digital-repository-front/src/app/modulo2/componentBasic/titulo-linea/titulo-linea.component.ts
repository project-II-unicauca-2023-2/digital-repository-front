import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo-linea',
  templateUrl: './titulo-linea.component.html',
  styleUrls: ['./titulo-linea.component.css']
})
export class TituloLineaComponent {
  @Input() title: string="";
}
