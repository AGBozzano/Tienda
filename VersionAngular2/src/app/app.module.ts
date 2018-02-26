import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
//Servicios
import { GestionCarritoService} from './Services/gestion-carrito.service';
import { GestionProductosService } from './Services/gestion-productos.service';
import { GestionUserService } from './Services/gestion-user.service';
//Rutas
import { RoutingModule } from './app-routing.module';
//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component';
import { BarraSuperiorComponent } from './Component/barra-superior/barra-superior.component';
import { CatalogoComponent } from './Component/catalogo/catalogo.component';
import { ProductoComponent } from './Component/catalogo/producto/producto.component';
import { CarritoComprasComponent } from './Component/carrito-compras/carrito-compras.component';


export const firebaseConfig = {
    apiKey: "AIzaSyAMcyr8aMSLVMKNDrx-7q0_Ls3a0NMHGvM",
    authDomain: "tienda-angular2-82354.firebaseapp.com",
    databaseURL: "https://tienda-angular2-82354.firebaseio.com",
    projectId: "tienda-angular2-82354",
    storageBucket: "tienda-angular2-82354.appspot.com",
    messagingSenderId: "118466506045"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BarraSuperiorComponent,
    CatalogoComponent,
    ProductoComponent,
    CarritoComprasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule
  ],
  providers: [GestionUserService, GestionProductosService, GestionCarritoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
