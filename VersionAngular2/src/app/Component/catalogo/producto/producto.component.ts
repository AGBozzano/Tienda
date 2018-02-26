import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
//Servicios
import { GestionCarritoService} from "../../../Services/gestion-carrito.service";
import { GestionProductosService } from '../../../Services/gestion-productos.service';
import { GestionUserService } from '../../../Services/gestion-user.service';
//Modelo
import { Producto } from '../../../Models/Producto';

@Component({
  selector: 'producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

	private DetalleProducto : Producto; 
    constructor(
    	private tiendaService : GestionProductosService,
	    private router : Router,
	    private auth : GestionUserService,
	    private activatedRoute : ActivatedRoute
    ){}

    ngOnInit() {

        this.detalleProducto()
  
    }
    detalleProducto(){
	    this.activatedRoute.params.subscribe(params => {
		    if(this.tiendaService.cargarCatalogo()){ 
		    	this.DetalleProducto = this.tiendaService.getDetalleProductos(params['id']); 
		        }else{
		        	this.tiendaService.getProductos().subscribe( 
		            () => {
		           	    this.DetalleProducto = this.tiendaService.getDetalleProductos(params['id']);
		            })
		    	}
	    	}
	    );
    }
    navegacionAtras(id:number){
    	let value = Number(id-1); 
    	if(value >= 0){ 
      		return value; 
    	}
    	return id
  	}
  	
  	navegacionSiguiente(id:number){
    	if(id < this.tiendaService.cargarCatalogo().length){ 
     	 let value = Number(id+1); 
      		return value; 
    	}
    	return id 
  	}
}
