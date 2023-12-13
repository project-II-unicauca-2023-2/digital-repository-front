import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent {
  @Output() emisorCategoriaSeleccionado = new EventEmitter<string>();
  @Input() anioBusqueda!: string;
  categoria:string;

  constructor(){
    this.categoria="todas";
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['anioBusqueda'] && changes['anioBusqueda'].currentValue) {
      console.log('RECIBIENDO DATOS', this.anioBusqueda);
      this.categoria = "todas";
    }
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
