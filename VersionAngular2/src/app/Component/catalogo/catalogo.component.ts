import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //Importar los componentes ForModule, FormControl y Validator para manejar y validar los formularios
import { CurrencyPipe } from '@angular/common';
import { OnChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
//Servicios
import { GestionCarritoService} from "../../Services/gestion-carrito.service";
import { GestionProductosService } from '../../Services/gestion-productos.service';
import { GestionUserService } from '../../Services/gestion-user.service';
//Modelos
import { ProductoCarrito } from '../../Models/ProductoCarrito';
import { Producto } from '../../Models/Producto';

@Component({
  selector: 'catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

	private titulo : string;
    public session : string;
  	private formulario : FormGroup; 
 	private listaProductos : Producto[]; 
	public productoCarrito : ProductoCarrito;


  	constructor(
  		private detectChanges:ChangeDetectorRef,  
        private router : Router, 
        private tiendaService : GestionProductosService,
        private auth : GestionUserService,
        private carritoService : GestionCarritoService 
    ){}

	ngOnInit() {
		if (!this.auth.checkSession()){ 
      		this.router.navigate(['/login']) 
   		}else{
   			this.session = sessionStorage.getItem("Carrito")
	        this.formulario = new FormGroup( 
		        {
		            'descripcion' : new FormControl(),
		            'imagen': new FormControl(),
		            'precio': new FormControl(),
		            'cantidad': new FormControl(),
		        })
	        this.mostrarProductos()
	    }
	    
	}
	
	mostrarProductos(){
	    if(!this.tiendaService.productosCatalogo){
	        this.tiendaService.getProductos().subscribe(
	        	()=>{
	         		this.listaProductos = this.tiendaService.catalogo; 
	          		this.checkCarrito(); 
	        	}
	      	)
	    }else{
	        this.listaProductos = this.tiendaService.productosCatalogo; 
	    }
  	}
	
 	agregarProducto(id:number, value:number){
    for (let item of this.tiendaService.productosCatalogo){ 
	    if(item.id == id){ 
	        if(item.disponible < value){
	            window.alert('Máxima existencia es: '+ item.disponible);
	        }else{
	            let cantidadActual = item.disponible; 
	            
	            this.productoCarrito = {
	                "id": item.id,
	                "descripcion": item.descripcion,
	                "imagen": item.imagen,
	           		"precio": item.precio,
	           		"cantidad": value 
	          	}
	         	this.carritoService.verificarCarrito(this.productoCarrito);
	         	item.disponible = cantidadActual - value; 
	       		}
	     	}
    	}
  	}
    
    filtrarCatalogo(filtro:string){
      	this.listaProductos = this.tiendaService.filtrarProducto(filtro);
    }
    
    checkCarrito(){
      	for(let itemCarrito of this.carritoService.listaCarrito){ 
        	this.tiendaService.actualizarDisponible(itemCarrito.id, itemCarrito.cantidad) 
      	}
    }
    
    obtenerCantidad(id:number){
      	for(let item of this.carritoService.listaCarrito){ 
     	 	if(item.id == id){ 
        		return item.cantidad 
        	}
    	}
    	return null 
 	}

}
