import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { } from 'stream';

interface Task {
  name: string;
  completed: boolean;
}
@Component({
  selector: 'app-aside-filtro',
  templateUrl: './aside-filtro.component.html',
  styleUrls: ['./aside-filtro.component.css',"../../calificacion-proveedor/asidem2/asidem2.component.css"]
})
export class AsideFiltroComponent implements OnInit {
  @Input() subcategorisContrato!:string[];  
  @Input() nombreCategoria!:string;
  @Output() emisorSubCategorias= new EventEmitter<string[]>();

  tipo=this.nombreCategoria;
  ngOnInit() {
    this.seleccionarTodo();
  }
  seleccionarTodo(){
    this.tasks.forEach(opcion => opcion.completed = true);

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['nombreCategoria'] && changes['nombreCategoria'].currentValue) {
      this.seleccionarTodo();      
      this.tipo=this.nombreCategoria;
      
    }
    if (changes['subcategorisContrato'] && changes['subcategorisContrato'].currentValue) {
      this.seleccionarTodo();
      //alert("ppp");      
      this.tasks= this.convertToTasks(this.subcategorisContrato);
      
    }
  }
  
  tasks: Task[] = [];
  ///---------------------------------------(inicio)Funciones para activacion /desactivacion de check-----------
  allComplete: boolean = false;
   convertToTasks(subcategories: string[]): Task[] {
    return subcategories.map(subcategory => ({
      name: subcategory,
      completed: true
    }));
  }
  updateAllComplete() {
    this.allComplete = this.tasks != null && this.tasks.every(t => t.completed);
  }
  
  someComplete(): boolean {
    if (this.tasks == null) {
      return false;
    }
    return this.tasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }
  
  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.tasks == null) {
      return;
    }
    this.tasks.forEach(t => (t.completed = completed));
  }
    ///---------------------------------------Funciones para activacion /desactivacion de check (fin)-----------
  emitirCat(){
    this.emisorSubCategorias.emit(this.tareasActivas());
  }
  tareasActivas():string[]{
    const tareasCompletadas: string[] = this.tasks
    .filter(tarea => tarea.completed)
    .map(tarea => tarea.name);
  
    return (tareasCompletadas);
  }
}
