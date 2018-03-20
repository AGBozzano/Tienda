import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
//Modelo
import { Producto } from '../Models/Producto';


@Injectable()
export class GestionProductosService {

  public catalogo : Producto[]; 
  public productosCatalogo : Producto[]; 
  public termino: string;

  constructor(private http : Http, private router : Router)
  {
    this.termino = "";
   }
  
  public getProductos(){
    return this.http.get('https://tienda-angular2-82354.firebaseio.com/producto/.json').map(
      (response : Response) => {
        this.catalogo =  response.json(); 
        this.productosCatalogo = this.catalogo 
      })
  }
 
  public getDetalleProductos(idProduct:number) : Producto {
    for(let item of this.productosCatalogo) {
      if(item.id == idProduct) {
        return item;
      }
    }
    return null;
  }
 
  cargarCatalogo(){
    return this.productosCatalogo
  }

  public getTermino() {
    return this.termino;
  }
  
  public filtrarProducto(filtro:string){
    this.productosCatalogo = this.catalogo;  
    filtro.toLowerCase(); 
    this.termino = "";
    let itemMatch : Producto[] = []; 
    for(let item of this.productosCatalogo){ 
      let nombre = item.nombre.toLowerCase(); 
        if(nombre.includes(filtro)){ 
          itemMatch.push(item)
           this.termino = itemMatch[0].nombre;
        } 

      }
     
      return itemMatch; 
  }
  
  actualizarDisponible(id:number, value:number, devolver:boolean = false){
    let catalogo = this.catalogo;
    for(let itemCatalogo of catalogo){ 
      if (itemCatalogo.id == id){ 
        if(devolver == false){
          itemCatalogo.disponible = (Number(itemCatalogo.disponible) - value); 
        }else{
          itemCatalogo.disponible = (Number(itemCatalogo.disponible) + value); 
      }
        this.productosCatalogo = this.catalogo; 
      }
    }
  }
}
