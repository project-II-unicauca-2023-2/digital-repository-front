import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent {
  @Output() emisorCategoriaSeleccionado = new EventEmitter<string>();
  categoria:string;

  constructor(){
    this.categoria="todas";
  }
  emitircategoria(){
    //alert("categoria");
    if(this.categoria){
      this.emisorCategoriaSeleccionado.emit(this.categoria.toLowerCase());
    }else{
      this.emisorCategoriaSeleccionado.emit("todas".toLowerCase());
    }

  }
}
