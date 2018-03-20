import { Component, OnInit } from '@angular/core';

//Servicios
import { GestionCarritoService} from '../../Services/gestion-carrito.service';
import { GestionUserService } from '../../Services/gestion-user.service';
//Modelos
import { ProductoCarrito } from '../../Models/ProductoCarrito';
@Component({
  selector: 'barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {

	   public productos : ProductoCarrito[] = [];
	
    constructor(
    	private carritoService : GestionCarritoService,
      private auth : GestionUserService
    ) { }

    ngOnInit() {
    	this.productos = this.carritoService.listaCarrito;
    }
  	isValid(){
    	if(this.carritoService.listaCarrito.length>0){
      		return true;
    	}else{
      		return false;
   		}
    }
    cerrarSesion(){
      this.auth.logout(); 
    }
}
