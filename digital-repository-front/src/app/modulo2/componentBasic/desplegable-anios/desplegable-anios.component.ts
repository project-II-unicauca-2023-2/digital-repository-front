import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-desplegable-anios',
  templateUrl: './desplegable-anios.component.html',
  styleUrls: ['./desplegable-anios.component.css']
})
export class DesplegableAniosComponent implements OnInit {
  AniosComboBox:string[]=[];
  anio :string="";
  @Output() emisorAnioSeleccionado = new EventEmitter<string>();
  ngOnInit(): void {
    this.cargarAniosCombo();
  }

  cargarAniosCombo(){
    let anioActual= new Date().getFullYear();
    this.anio=anioActual+"";
    for(let a=1995;a<=anioActual;a++){      
      this.AniosComboBox.push(a+"");
    } 
  }
  emitirAnio(){
    console.log("emiorooo");
    this.emisorAnioSeleccionado.emit(this.anio);
  }
}
