import { Component } from '@angular/core';
export interface Tile {
  criterio : string;
  descripcion : string;
}

@Component({
  selector: 'app-calificacion-proveedor',
  templateUrl: './calificacion-proveedor.component.html',
  styleUrls: ['./calificacion-proveedor.component.css']
})
export class CalificacionProveedorComponent {
  tiles: Tile[] = [
    {criterio: 'criterio 1 ', descripcion: 'Lorem ipsum dolo'},
    {criterio: 'criterio 2 ', descripcion: 'Nulla facilisi. Aenean vel justo at risus tincidunt lobortis. Ut non tincidunt ante, vitae aliquet enim. Maecenas non semper ante. Sed vitae augue nec massa tincidunt posuere. Vivamus fringilla, turpis at volutpat accumsan, ipsum nisi luctus tellus, sit amet commodo nulla metus ut neque.'},
    {criterio: 'criterio 3 ', descripcion: 'Quisque non neque et sapien scelerisque finibus ut sit amet nunc. Nunc eu erat tristique, finibus neque in, tincidunt odio. Nullam sagittis sem in leo vulputate, sit amet tincidunt massa rhoncus. Integer nec hendrerit purus, sed tempor justo. In convallis risus vitae aliquet molestie. Sed malesuada dolor in nibh aliquet, a bibendum dui auctor.'},
  ];
}
