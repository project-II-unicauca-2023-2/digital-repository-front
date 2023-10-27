import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent {
  @Input() criterio: string="";
  @Input() descripcionCriterio: string="";
  @Input() contBotones:number=0;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  dicPuntaje: { [key: number]: string } = {
    1: "No cumple",
    2: "Minimamente",
    3: "Parcialmente",
    4: "Plenamente",
    5: "Supera expectativas"
  };
  
  getPuntaje() {
    return Object.keys(this.dicPuntaje);
  }

}
