import { Component, HostListener, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-linea-calificacion',
  templateUrl: './linea-calificacion.component.html',
  styleUrls: ['./linea-calificacion.component.css']
})
export class LineaCalificacionComponent {
  
  @Input() nombreCategoria!:string;
  @Input() promedioCategoriaContrato!:number;  
  //single: any[];
  view: [number, number] = [window.innerWidth * 0.2, window.innerHeight * 0.3];
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.view = [event.target.innerWidth * 0.2, event.target.innerHeight * 0.3];
  }
  value: number = 0.0;
  min: number = 1;
  max: number = 5;
  units:string="PromedioCalificacion";
  previousValue: number = 5;

  onSelect(event:any) {
    //console.log(event);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['nombreCategoria'] && changes['nombreCategoria'].currentValue) {
        if(this.nombreCategoria.toLocaleLowerCase()!=='todas'){
          this.units="PromedioCalificacion"+this.nombreCategoria.charAt(0).toUpperCase() + this.nombreCategoria.slice(1).toLowerCase();//primera en mayuscula
        }else{
          this.units="PromedioCalificacionTotal"
        }
      
    }
    if (changes['promedioCategoriaContrato'] && changes['promedioCategoriaContrato'].currentValue) {
      this.value =this.promedioCategoriaContrato;    
    }
  }
}
