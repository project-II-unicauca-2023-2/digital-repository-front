import { Component } from '@angular/core';

export interface Tile {
  right : String;
  left : String;
}

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent {
  tiles: Tile[] = [
    {right: 'One', left: 'si'}
  ];

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

}
