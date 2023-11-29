import { Component, Input, SimpleChanges } from '@angular/core';

interface Task {
  name: string;
  completed: boolean;
}
@Component({
  selector: 'app-aside-filtro',
  templateUrl: './aside-filtro.component.html',
  styleUrls: ['./aside-filtro.component.css',"../../calificacion-proveedor/asidem2/asidem2.component.css"]
})
export class AsideFiltroComponent {
  @Input() subcategorisContrato!:string[];
  
  @Input() nombreCategoria!:string;
  tipo=this.nombreCategoria;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nombreCategoria'] && changes['nombreCategoria'].currentValue) {
      
      this.tipo=this.nombreCategoria;
      
    }
    if (changes['subcategorisContrato'] && changes['subcategorisContrato'].currentValue) {
      
      this.tasks= this.convertToTasks(this.subcategorisContrato);
      
    }
  }
  
  tasks: Task[] = [];
  
  allComplete: boolean = false;
   convertToTasks(subcategories: string[]): Task[] {
    return subcategories.map(subcategory => ({
      name: subcategory,
      completed: false
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
}
