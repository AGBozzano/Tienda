import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
//Servicios
import { GestionCarritoService} from '../../Services/gestion-carrito.service';
import { GestionProductosService } from '../../Services/gestion-productos.service';
import { GestionUserService } from '../../Services/gestion-user.service';
//Modelos
import { ProductoCarrito } from '../../Models/ProductoCarrito';
import { Producto } from '../../Models/Producto';

@Component({
  selector: 'carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {
	
	  public listaCarrito : ProductoCarrito[] = [];
    public catalogo : Producto[] = [];
    public titulo: string;

  	constructor(
		  private carritoService : GestionCarritoService,
      private detectChanges: ChangeDetectorRef,
      private tiendaService : GestionProductosService,
      private auth : GestionUserService,
      private http : Http, private router : Router
  	) {}

 	ngOnInit() {
    if (!this.auth.checkSession()){
      console.log(sessionStorage.getItem("Session"))
      this.router.navigate(['/login'])
    }else{
 		  this.listaCarrito = this.carritoService.itemsCarrito();
    }
  }
   
  total(){
    let total :number = 0 
    let items = this.carritoService.listaCarrito;
    for(let subtotal of items ){ 
      total += subtotal.cantidad * subtotal.precio; 
    }
    return total; 
  }
    
 	pagarCarrito(){
    	this.http.get('https://tienda-angular2.firebaseio.com/productos/.json') 
    	.map((response : Response) => {
        	this.catalogo =  response.json() 
     	  }
    	).subscribe(
      		()=>{
		        for (let itemCatalogo of this.catalogo){ 
		          for (let item of this.listaCarrito){ 
		            if ( itemCatalogo.id == item.id ){ 
		              let cantidad = Number(item.cantidad); 
		              itemCatalogo.disponible = itemCatalogo.disponible - cantidad 
		              this.actualizarDisponible(item.id, itemCatalogo).subscribe( 
		                (response) => {
		                  this.vaciarCarrito() 
		                }
		              )
		            }
		          }
		        }
            window.alert('Gracias por su compra... Los esperamos pronto...');
        		this.router.navigate(['/tienda']) 
      		}
    	)
    }
    actualizarDisponible(id:number, itemCatalogo:Producto){
    		return this.http.put(`https://tienda-angular2.firebaseio.com/productos/${id}.json`, itemCatalogo) 
    		.map((response : Response) => {
        		return this.catalogo =  response.json() 
      		}
    	)
    }
   
    vaciarCarrito(){
	    sessionStorage.setItem('Carrito', '[]') 
	    this.listaCarrito = []; 
	    this.carritoService.eliminarCarrito(this.listaCarrito); 
	    this.carritoService.listaCarrito = [];
	    this.tiendaService.getProductos().subscribe() 
    }
   
    eliminarProducto(id:number, value:number){
        for(let item of this.listaCarrito){ 
        	if(item.id == id){ 
          		let index = this.listaCarrito.indexOf(item); 
          			if(value == null){ 
			            this.listaCarrito.splice(index, 1); 
			            this.carritoService.eliminarCarrito(this.listaCarrito); 
			            this.total();
			            this.tiendaService.actualizarDisponible(id, Number(item.cantidad), true); 
          			}else{
            			if(value > 0){ 
	              				let validar = (Number(item.cantidad) - value); 
	              			if(validar < 0){
	                			window.alert('La cantidad indicada excede a la cantidad en el carrito.'); 
	              			}else{
	                			item.cantidad = validar; 
	                			if (item.cantidad == 0){ 
	                  				
	                 			 	this.listaCarrito.splice(index, 1);
	                			}
				                this.carritoService.eliminarCarrito(this.listaCarrito); 
				                this.tiendaService.actualizarDisponible(id, Number(value), true); 
	              			}
            			}else{
            				window.alert('Debe especificar una cantidad válida');
            			}
          			}
        	}
      	}
      	this.detectChanges.detectChanges(); 
    }
}
