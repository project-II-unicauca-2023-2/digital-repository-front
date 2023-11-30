import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DasboardService {

  constructor() { }
  getSubCategoriasBienes():string[]{
    return ["Compraventa","Suministro","Órdenes de Compra"];
  }
  getSubCategoriasServicios():string[]{
    return [" Prestación de servicios","Consultoría","Suministro","Arrendamiento","Pasantía","Judicatura","Aprendizaje"];
  }
  getSubCategoriasObras():string[]{
    return ["Obra"];
  }
  getPromedioBienes():number{
    return this.formatoCortoDecimal(3.53423412343414) ;
  }
  gePromedioServicios():number{
    return this.formatoCortoDecimal(4.54234134123412341234);
  }
  getPromediosObras():number{
    return this.formatoCortoDecimal(4.054634563563563);
  }
  getPromediosTotales():number{
    return this.formatoCortoDecimal((this.gePromedioServicios()+this.getPromedioBienes()+this.getPromediosObras())/3);
  }
  formatoCortoDecimal(numero:number):number{
    return parseFloat(numero.toPrecision(2));
  }
}
